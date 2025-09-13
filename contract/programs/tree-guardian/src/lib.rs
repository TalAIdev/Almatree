use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint, MintTo, Transfer};

declare_id!("7qWiT8orEzgLHDz3BkWFon5PgZScny7gSAHZKAuALRN7");

#[program]
pub mod tree_guardian {
    use super::*;

    /// Initialize the Tree Guardian program
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let tree_guardian = &mut ctx.accounts.tree_guardian;
        tree_guardian.authority = ctx.accounts.authority.key();
        tree_guardian.total_trees = 0;
        tree_guardian.bump = ctx.bumps.tree_guardian;
        
        msg!("Tree Guardian program initialized");
        Ok(())
    }

    /// Mint a new Tree Guardian NFT (simplified for hackathon MVP)
    pub fn mint_nft(
        ctx: Context<MintNft>,
        location: String,
        planting_date: i64,
    ) -> Result<()> {
        require!(location.len() <= 50, ErrorCode::LocationTooLong);
        require!(planting_date > 0, ErrorCode::InvalidDate);

        // Increment total trees
        let tree_id = ctx.accounts.tree_guardian.total_trees + 1;
        ctx.accounts.tree_guardian.total_trees = tree_id;

        // Set NFT metadata (simplified)
        ctx.accounts.nft_metadata.owner = ctx.accounts.owner.key();
        ctx.accounts.nft_metadata.location = location.clone();
        ctx.accounts.nft_metadata.planting_date = planting_date;
        ctx.accounts.nft_metadata.tree_id = tree_id;
        ctx.accounts.nft_metadata.impact_score = 100; // Base impact score
        ctx.accounts.nft_metadata.bump = ctx.bumps.nft_metadata;

        // Mint 1 token to the owner
        let mint_to_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.nft_mint.to_account_info(),
                to: ctx.accounts.nft_token_account.to_account_info(),
                authority: ctx.accounts.tree_guardian.to_account_info(),
            },
        );
        token::mint_to(mint_to_ctx, 1)?;

        emit!(NftMinted {
            owner: ctx.accounts.owner.key(),
            tree_id,
            location: location.clone(),
            planting_date,
        });

        msg!("Tree Guardian NFT minted: Tree #{} at {}", tree_id, location);
        Ok(())
    }

    /// Transfer a Tree Guardian NFT (simplified - compliance placeholder)
    pub fn transfer_nft(
        ctx: Context<TransferNft>,
        amount: u64,
    ) -> Result<()> {
        require!(amount == 1, ErrorCode::InvalidAmount);

        // TODO: Add KYC compliance hooks for SEZ KZ (future step)
        // For hackathon MVP, we'll just show "✅ Compliance passed" in UI

        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.from_token_account.to_account_info(),
                to: ctx.accounts.to_token_account.to_account_info(),
                authority: ctx.accounts.from.to_account_info(),
            },
        );
        token::transfer(transfer_ctx, amount)?;

        emit!(NftTransferred {
            from: ctx.accounts.from.key(),
            to: ctx.accounts.to.key(),
            tree_id: ctx.accounts.nft_metadata.tree_id,
            amount,
        });

        msg!("Tree Guardian NFT transferred from {} to {}", 
             ctx.accounts.from.key(), ctx.accounts.to.key());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + TreeGuardian::INIT_SPACE,
        seeds = [b"tree_guardian"],
        bump
    )]
    pub tree_guardian: Account<'info, TreeGuardian>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(location: String, planting_date: i64)]
pub struct MintNft<'info> {
    #[account(
        mut,
        seeds = [b"tree_guardian"],
        bump = tree_guardian.bump
    )]
    pub tree_guardian: Account<'info, TreeGuardian>,

    #[account(
        init,
        payer = owner,
        mint::decimals = 0,
        mint::authority = tree_guardian,
        mint::freeze_authority = tree_guardian,
    )]
    pub nft_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = owner,
        space = 8 + NftMetadata::INIT_SPACE,
        seeds = [b"nft_metadata", nft_mint.key().as_ref()],
        bump
    )]
    pub nft_metadata: Account<'info, NftMetadata>,

    #[account(
        init,
        payer = owner,
        associated_token::mint = nft_mint,
        associated_token::authority = owner,
    )]
    pub nft_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, anchor_spl::associated_token::AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct TransferNft<'info> {
    #[account(
        mut,
        seeds = [b"tree_guardian"],
        bump = tree_guardian.bump
    )]
    pub tree_guardian: Account<'info, TreeGuardian>,

    #[account(
        mut,
        seeds = [b"nft_metadata", nft_mint.key().as_ref()],
        bump = nft_metadata.bump
    )]
    pub nft_metadata: Account<'info, NftMetadata>,

    #[account(mut)]
    pub nft_mint: Account<'info, Mint>,

    #[account(mut)]
    pub from_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub to_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub from: Signer<'info>,

    /// CHECK: This is not dangerous because we don't read or write from this account
    pub to: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
}

#[account]
#[derive(InitSpace)]
pub struct TreeGuardian {
    pub authority: Pubkey,
    pub total_trees: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct NftMetadata {
    pub owner: Pubkey,
    #[max_len(50)]
    pub location: String,
    pub planting_date: i64,
    pub tree_id: u64,
    pub impact_score: u32, // Simplified - just base score for hackathon
    pub bump: u8,
}

#[event]
pub struct NftMinted {
    pub owner: Pubkey,
    pub tree_id: u64,
    pub location: String,
    pub planting_date: i64,
}

#[event]
pub struct NftTransferred {
    pub from: Pubkey,
    pub to: Pubkey,
    pub tree_id: u64,
    pub amount: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Location string is too long")]
    LocationTooLong,
    #[msg("Invalid planting date")]
    InvalidDate,
    #[msg("Invalid transfer amount")]
    InvalidAmount,
}
