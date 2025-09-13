import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TreeGuardian } from "../target/types/tree_guardian";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { 
  createMint, 
  createAssociatedTokenAccount, 
  mintTo, 
  getAccount,
  TOKEN_PROGRAM_ID 
} from "@solana/spl-token";
import { expect } from "chai";

describe("tree-guardian", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TreeGuardian as Program<TreeGuardian>;
  const provider = anchor.getProvider();

  // Test accounts
  let authority: Keypair;
  let owner: Keypair;
  let treeGuardianPDA: PublicKey;
  let nftMint: PublicKey;
  let nftMetadataPDA: PublicKey;
  let nftTokenAccount: PublicKey;

  before(async () => {
    authority = Keypair.generate();
    owner = Keypair.generate();

    // Airdrop SOL to test accounts
    await provider.connection.requestAirdrop(authority.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(owner.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);

    // Wait for airdrops to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Derive PDAs
    [treeGuardianPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("tree_guardian")],
      program.programId
    );
  });

  it("Initializes the Tree Guardian program", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        treeGuardian: treeGuardianPDA,
        authority: authority.publicKey,
        systemProgram: SystemProgram.programId,
      } as any)
      .signers([authority])
      .rpc();

    console.log("Initialize transaction signature", tx);

    // Verify the account was created
    const treeGuardianAccount = await program.account.treeGuardian.fetch(treeGuardianPDA);
    expect(treeGuardianAccount.authority.toString()).to.equal(authority.publicKey.toString());
    expect(treeGuardianAccount.totalTrees.toNumber()).to.equal(0);
  });

  it("Mints a Tree Guardian NFT", async () => {
    const location = "Berezovsky Street, Almaty";
    const plantingDate = new anchor.BN(Date.now() / 1000);

    // Derive NFT mint and metadata PDAs
    nftMint = Keypair.generate().publicKey;
    [nftMetadataPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("nft_metadata"), nftMint.toBuffer()],
      program.programId
    );

    // Create associated token account
    nftTokenAccount = await createAssociatedTokenAccount(
      provider.connection,
      owner,
      nftMint,
      owner.publicKey,
      undefined,
      TOKEN_PROGRAM_ID
    );

    const tx = await program.methods
      .mintNft(location, plantingDate)
      .accounts({
        treeGuardian: treeGuardianPDA,
        nftMint: nftMint,
        nftMetadata: nftMetadataPDA,
        nftTokenAccount: nftTokenAccount,
        owner: owner.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      } as any)
      .signers([owner])
      .rpc();

    console.log("Mint NFT transaction signature", tx);

    // Verify the NFT was minted
    const nftMetadataAccount = await program.account.nftMetadata.fetch(nftMetadataPDA);
    expect(nftMetadataAccount.owner.toString()).to.equal(owner.publicKey.toString());
    expect(nftMetadataAccount.location).to.equal(location);
    expect(nftMetadataAccount.treeId.toNumber()).to.equal(1);
    expect(nftMetadataAccount.impactScore).to.equal(100);

    // Verify token account has 1 token
    const tokenAccount = await getAccount(provider.connection, nftTokenAccount);
    expect(tokenAccount.amount.toString()).to.equal("1");

    // Verify tree guardian stats updated
    const treeGuardianAccount = await program.account.treeGuardian.fetch(treeGuardianPDA);
    expect(treeGuardianAccount.totalTrees.toNumber()).to.equal(1);
  });

  it("Transfers a Tree Guardian NFT", async () => {
    const newOwner = Keypair.generate();
    
    // Create token account for new owner
    const newOwnerTokenAccount = await createAssociatedTokenAccount(
      provider.connection,
      owner,
      nftMint,
      newOwner.publicKey,
      undefined,
      TOKEN_PROGRAM_ID
    );

    const tx = await program.methods
      .transferNft(new anchor.BN(1))
      .accounts({
        treeGuardian: treeGuardianPDA,
        nftMetadata: nftMetadataPDA,
        nftMint: nftMint,
        fromTokenAccount: nftTokenAccount,
        toTokenAccount: newOwnerTokenAccount,
        from: owner.publicKey,
        to: newOwner.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      } as any)
      .signers([owner])
      .rpc();

    console.log("Transfer NFT transaction signature", tx);

    // Verify transfer completed
    const fromTokenAccount = await getAccount(provider.connection, nftTokenAccount);
    const toTokenAccount = await getAccount(provider.connection, newOwnerTokenAccount);
    
    expect(fromTokenAccount.amount.toString()).to.equal("0");
    expect(toTokenAccount.amount.toString()).to.equal("1");
  });

  it("Fails to mint NFT with invalid data", async () => {
    const invalidLocation = "A".repeat(101); // Too long
    const plantingDate = new anchor.BN(Date.now() / 1000);

    try {
      await program.methods
        .mintNft(invalidLocation, plantingDate)
        .accounts({
          treeGuardian: treeGuardianPDA,
          nftMint: Keypair.generate().publicKey,
          nftMetadata: PublicKey.findProgramAddressSync(
            [Buffer.from("nft_metadata"), Keypair.generate().publicKey.toBuffer()],
            program.programId
          )[0],
          nftTokenAccount: Keypair.generate().publicKey,
          owner: owner.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        } as any)
        .signers([owner])
        .rpc();

      expect.fail("Should have failed with location too long error");
    } catch (error: any) {
      expect(error.message).to.include("LocationTooLong");
    }
  });
});
