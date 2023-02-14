import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit'
import { clientActions } from '../../actions'
import { Game } from '../../models'
import { initialGameState } from '../initialGameState'

export const auctionsReducer = createReducer(
  initialGameState.auctions,
  (builder: ActionReducerMapBuilder<Game['auctions']>) =>
    builder
      .addCase(clientActions.PLACE_BID, (state, action) => {
        const lastAuction = state.slice(-1)[0]
        const lastRound = lastAuction.rounds.slice(-1)[0]
        const player = lastAuction.participants[lastAuction.currentBidderIndex]
        if (player.spice < action.payload.bid) return
        lastAuction.lastActionTimestamp = new Date().toISOString()
        if (!lastAuction.isRunning) {
          lastAuction.isRunning = true
        }
        lastRound.bids.push({
          playerId: action.payload.playerId,
          amount: action.payload.bid
        })
        lastAuction.currentBidderIndex =
          (lastAuction.currentBidderIndex + 1) % lastAuction.participants.length
      })
      .addCase(clientActions.SKIP_BID, (state, action) => {
        const lastAuction = state.slice(-1)[0]
        const lastRound = lastAuction.rounds.slice(-1)[0]
        lastAuction.lastActionTimestamp = new Date().toISOString()
        if (!lastAuction.isRunning) {
          lastAuction.isRunning = true
        }
        lastRound.skipped.push(action.payload.playerId)
        lastAuction.currentBidderIndex =
          (lastAuction.currentBidderIndex + 1) % lastAuction.participants.length

        if (
          lastRound.bids.length === 0 &&
          lastRound.skipped.length === lastAuction.participants.length
        ) {
          lastAuction.isRunning = false
          lastAuction.isDone = true
        }

        if (lastRound.skipped.length === lastAuction.participants.length - 1) {
          lastAuction.isRunning = false
          if (lastAuction.rounds.length < lastAuction.participants.length) {
            lastAuction.rounds.push({
              bids: [],
              skipped: []
            })
          } else {
            lastAuction.isDone = true
          }
        }
      })
)
