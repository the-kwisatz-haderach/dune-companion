import { Cities } from '../models/city'
import { Factions, Faction } from '../models/faction'

export const factions: Record<Factions, Faction> = {
  BENE_GESSERIT: {
    name: 'Bene Gesserit',
    shorthand: 'BNG',
    advantages: [
      {
        name: 'Force markers',
        description:
          'Your forces have two sides, the spiritual, striped side (advisor) and the battle side with no stripes (fighter). Fighters are normal forces.',
        isAdvanced: true
      },
      {
        name: 'Karama',
        description:
          'You may use any worthless card as if it is a Karama Card.',
        isAdvanced: true
      }
    ],
    description:
      'The origins of the Bene Gesserit are not widely known. What is clear is that the Bene Gesserit arose in the political turmoil that followed the Butlerian Jihad, and quickly established themselves as an influential political force. However, during the Butlerian Jihad, the Bene Gesserit already had a Reverend Mother Superior, which seems to show that their hierarchical structure had already formed.',
    itemsAllowed: 4,
    freeRevivals: 1,
    startingSpice: 5,
    startingItems: 1,
    startingPlanetaryForces: 1,
    startingReserveForces: 19,
    alliancePower: 'In an Alliance you may Voice an ally’s opponent.',
    strategy:
      'Your major handicap is your low revival rate. You must not allow large numbers of your forces to be sent to the Tleilaxu Tanks or you may find yourself without sufficient reserves to bring onto the planet. Your strengths are that you have the ability to win by correctly predicting the turn another player will win the game and then secretly working for a favorable outcome. In addition, you can be quite effective in battles by voicing your opponent and leaving them weaponless or defenseless. You can afford to bide your time while casting subtle innuendos about who you have picked to win.',
    startingCity: null,
    backstory: '',
    commander: {
      name: 'Mother Mohiam',
      backstory:
        'The Bene Gesserit Sisterhood, represented by Reverend Mother Gaius Helen Mohiam — ancient and inscrutable, carefully trained in psychological control and a genius at achieving her ends through the efforts of others.'
    },
    leaders: [
      { name: 'Alia', strength: 5, backstory: '' },
      { name: 'Mother Ramallo', strength: 5, backstory: '' },
      { name: 'Margot Lady Fenring', strength: 5, backstory: '' },
      { name: 'Princess Irulan', strength: 5, backstory: '' },
      { name: 'Wanna Yueh', strength: 5, backstory: '' }
    ],
    karamaPower: '',
    keyAdvantage: 'You are adept in the ways of mind control.'
  },
  HOUSE_ATREIDES: {
    name: 'House Atreides',
    shorthand: 'ATR',
    advantages: [],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, soluta.',
    itemsAllowed: 4,
    freeRevivals: 2,
    startingSpice: 10,
    startingItems: 1,
    alliancePower:
      'You may assist your allies by forcing their opponent to show them one element of their Battle Plan.',
    strategy:
      'You are handicapped by the fact that you must both purchase cards and ship onto Dune, and you have no source of income other than the spice on the planet’s surface. This will keep you in constant battles. Since you start from Arrakeen, you have the movement advantage of 3 from the outset, and it is wise to protect this. Your prescience allows you to avoid being devoured by the sandworms and helps you to get some slight head start on the Spice Blow. In addition, you can gain some slight advantage over those who would do battle with you by your foreknowledge of one element of their Battle Plan.',
    startingCity: Cities.ARRAKEEN,
    startingReserveForces: 10,
    startingPlanetaryForces: 10,
    backstory: '',
    commander: {
      name: "Paul Muad'dib",
      backstory:
        'The Atreides, led by the youthful Paul Atreides (Muad’Dib) — rightful heir to the planet, gifted with valiant lieutenants and a strange partial awareness of the future, but beset by more powerful and treacherous opponents.'
    },
    leaders: [
      { name: 'Thufir Hawat', strength: 5, backstory: '' },
      { name: 'Lady Jessica', strength: 5, backstory: '' },
      { name: 'Gurney Halleck', strength: 4, backstory: '' },
      { name: 'Duncan Idaho', strength: 2, backstory: '' },
      { name: 'Dr. Wellington Yueh', strength: 1, backstory: '' }
    ],
    karamaPower:
      'You may use a Karama Card to look at any one player’s entire Battle Plan.',
    keyAdvantage: 'You have limited prescience.'
  },
  HOUSE_HARKONNEN: {
    name: 'House Harkonnen',
    shorthand: 'HAR',
    advantages: [],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, soluta.',
    itemsAllowed: 8,
    freeRevivals: 2,
    startingSpice: 10,
    startingItems: 2,
    alliancePower:
      'Traitor Cards that you hold may be used against your ally’s opponent if you so choose.',
    strategy:
      'Your major handicap is your difficulty in obtaining spice. You are at your greatest relative strength at the beginning of the game and should capitalize on this fact by quickly buying as many Treachery Cards as you can, and then surging into battle. Since you get 2 cards for every one you bid for, you can afford to bid a little higher than most, but if you spend too lavishly at first you will not have enough spice to ship in forces or buy more cards at a later date. There is nothing so pitiful to see as a Harkonnen on CHOAM Charity. The large number of cards you may hold will increase your chances of holding worthless cards. To counteract this, you should pick your battles, both to unload cards and to flush out the traitors you control.',
    startingCity: Cities.CARTHAG,
    startingReserveForces: 10,
    startingPlanetaryForces: 10,
    backstory: '',
    commander: {
      name: 'Baron Harkonnen',
      backstory:
        'The Harkonnens, led by the decadent Baron Vladimir Harkonnen — master of treachery and cruel deeds.'
    },
    leaders: [
      { name: 'Feyd Rautha', strength: 6, backstory: '' },
      { name: 'Beast Rabban', strength: 4, backstory: '' },
      { name: 'Piter De Vries', strength: 3, backstory: '' },
      { name: 'Captain Iakin Nefud', strength: 2, backstory: '' },
      { name: 'Umman Kudo', strength: 1, backstory: '' }
    ],
    karamaPower:
      'You may use a Karama Card to take without looking any number of cards, up to the entire hand of any one player of your choice. For each card you take, you must give that player one of your cards in return.',
    keyAdvantage: 'You excel in treachery.'
  },
  FREMEN: {
    name: 'Fremen',
    shorthand: 'FRE',
    advantages: [],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, soluta.',
    itemsAllowed: 4,
    freeRevivals: 3,
    startingSpice: 3,
    startingItems: 1,
    strategy:
      'Your major handicap is poverty. Usually you can’t purchase Treachery Cards for several turns, since the others will outbid you. You must be patient and move your forces into any vacant strongholds, avoiding battles until you are prepared. When you do battle you can afford to dial high and sacrifice your forces since they have a high revival rate and you can bring them back into play at no cost. You have the advantage of better mobility than factions without a city stronghold, and you have good fighting leaders. Your game plan will be to bide your time and wait for an accessible Spice Blow that no one else wants in order to build up your resources.',
    startingCity: null,
    startingReserveForces: 10,
    startingPlanetaryForces: 10,
    alliancePower:
      'You may decide to protect (or not protect) your allies from being devoured by sandworms and, at your discretion, may also allow them to revive 3 forces for free during revival. In addition, your allies win with you if you win with the Fremen Special Victory Condition.',
    backstory: '',
    commander: {
      name: 'Liet Kynes',
      backstory:
        'The Fremen, represented by the planetary ecologist Liet-Kynes — commanding fierce hordes of natives, adept at life and travel on the planet, and dedicated to preventing any outside control while bringing about Dune’s own natural regeneration.'
    },
    leaders: [
      { name: 'Stilgar', strength: 7, backstory: '' },
      { name: 'Chani', strength: 6, backstory: '' },
      { name: 'Otheym', strength: 5, backstory: '' },
      { name: 'Shadout Mapes', strength: 3, backstory: '' },
      { name: 'Jamis', strength: 2, backstory: '' }
    ],
    karamaPower:
      'You may use a Karama Card to place your sandworm token in any sand territory that you wish. This is treated as a normal sandworm.',
    keyAdvantage: 'You are native to Dune and know its ways.'
  },
  SPACING_GUILD: {
    name: 'Spacing Guild',
    alliancePower:
      'Allies may ship from their off-planet reserves onto Dune or cross-ship from one territory to another with forces that are already on Dune at the Spacing Guild half-price rate. Your allies win with you if you win with the Spacing Guild Special Victory Condition.',
    shorthand: 'SGU',
    advantages: [],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, soluta.',
    itemsAllowed: 4,
    freeRevivals: 1,
    startingSpice: 5,
    startingItems: 1,
    strategy:
      'Your major handicap is your weak array of leaders and your inability to revive quickly. In addition, you usually cannot buy Treachery Cards at the beginning of the game. You are vulnerable at this point and should make your stronger moves after building up your resources. If players do not ship on at a steady rate you will have to fight for spice on the surface or collect only the isolated blows. Your major advantage is that you can ship on to Dune inexpensively and can ship from any one territory to any other. This mobility allows you to make surprise moves and is particularly useful when you are the last player in the Movement Phase. If the game is out of reach and well along, try suicide battles against the strongest players to weaken them and prevent a win until the round ends. Then the victory is yours.',
    startingCity: Cities.TUEKS_SIETCH,
    startingReserveForces: 5,
    startingPlanetaryForces: 15,
    backstory: '',
    commander: {
      name: 'Edric',
      backstory:
        'The Spacing Guild, represented by steersman Edric (in league with smuggler bands) — monopolist of transport, yet addicted to ever increasing spice flows.'
    },
    leaders: [
      { name: 'Staban Tuek', strength: 5, backstory: '' },
      { name: 'Master Bewt', strength: 3, backstory: '' },
      { name: 'Esmar Tuek', strength: 3, backstory: '' },
      { name: 'Soo-Soo Sook', strength: 2, backstory: '' },
      { name: 'Guild Rep.', strength: 1, backstory: '' }
    ],
    karamaPower:
      'You may use a Karama Card to stop one off-planet shipment of any one player.',
    keyAdvantage: 'You control all shipment onto and off Dune.'
  },
  EMPEROR: {
    name: 'Emperor',
    shorthand: 'EMP',
    advantages: [],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, soluta.',
    itemsAllowed: 4,
    freeRevivals: 1,
    startingSpice: 10,
    startingItems: 1,
    strategy:
      'Your major handicap is that you must ship in all of your forces at the start of the game, and often this move requires a battle before you are prepared. Even though you do not need to forage for spice on the surface of Dune often, you still are quite subject to attack since you are likely to concentrate on the cities for the mobility they give you. On the plus side, you will never need spice badly, since the bidding will keep you supplied.',
    startingCity: null,
    startingReserveForces: 20,
    startingPlanetaryForces: 0,
    backstory: '',
    alliancePower:
      'You may share your great wealth with your allies as well as paying spice (directly to the bank) for the revival of up to 3 extra of their forces (for a possible total of 6 during each Revival Phase) from the Tleilaxu Tanks.',
    commander: {
      name: 'Emperor Shaddam IV',
      backstory:
        'The Emperor, his majesty the Padishah Emperor Shaddam IV — keen and efficient, yet easily lulled into complacency by his own trappings of power.'
    },
    leaders: [
      { name: 'Hasimir Fenring', strength: 6, backstory: '' },
      { name: 'Captain Aramsham', strength: 5, backstory: '' },
      { name: 'Caid', strength: 3, backstory: '' },
      { name: 'Burseg', strength: 3, backstory: '' },
      { name: 'Bashar', strength: 2, backstory: '' }
    ],
    karamaPower:
      'You may use a Karama Card to revive up to three forces or one leader for free.',
    keyAdvantage: 'You have access to great wealth.'
  }
}
