export const coins = [
    {
      "source": "pontem",
      "name": "Aptos Coin",
      "chainId": 1,
      "decimals": 8,
      "symbol": "APT",
      "type": "0x1::aptos_coin::AptosCoin",
      "order": 1
    },
    // {
    //   "source": "wormhole",
    //   "chainId": 1,
    //   "name": "USD Coin",
    //   "decimals": 6,
    //   "symbol": "USDC",
    //   "type": "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T",
    //   "order": 10
    // },
    // {
    //   "source": "layerzero",
    //   "chainId": 1,
    //   "name": "USD Coin",
    //   "decimals": 6,
    //   "symbol": "USDC",
    //   "type": "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC",
    //   "order": 10
    // },
    // {
    //   "source": "celar",
    //   "chainId": 1,
    //   "name": "USD Coin",
    //   "decimals": 6,
    //   "symbol": "USDC",
    //   "type": "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdcCoin",
    //   "order": 10
    // },
    // {
    //   "source": "wormhole",
    //   "chainId": 1,
    //   "name": "Tether USD",
    //   "symbol": "USDT",
    //   "decimals": 6,
    //   "type": "0xa2eda21a58856fda86451436513b867c97eecb4ba099da5775520e0f7492e852::coin::T",
    //   "order": 20
    // },
    // {
    //   "source": "layerzero",
    //   "chainId": 1,
    //   "name": "Tether USD",
    //   "decimals": 6,
    //   "symbol": "USDT",
    //   "type": "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT",
    //   "order": 20
    // },
    // {
    //   "source": "celar",
    //   "chainId": 1,
    //   "name": "Tether USD",
    //   "decimals": 6,
    //   "symbol": "USDT",
    //   "type": "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdtCoin",
    //   "order": 20
    // },
    // {
    //   "source": "celar",
    //   "chainId": 1,
    //   "name": "Dai Stablecoin",
    //   "decimals": 8,
    //   "symbol": "DAI",
    //   "type": "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::DaiCoin",
    //   "order": 30
    // },
    // {
    //   "source": "wormhole",
    //   "chainId": 1,
    //   "name": "Bitcoin",
    //   "symbol": "BTC",
    //   "decimals": 8,
    //   "type": "0xae478ff7d83ed072dbc5e264250e67ef58f57c99d89b447efd8a0a2e8b2be76e::coin::T",
    //   "order": 40
    // },
    // {
    //   "source": "celar",
    //   "chainId": 1,
    //   "name": "Wrapped BTC",
    //   "decimals": 8,
    //   "symbol": "WBTC",
    //   "type": "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::WbtcCoin",
    //   "order": 40
    // },
    // {
    //   "source": "layerzero",
    //   "chainId": 1,
    //   "name": "Wrapped Ether",
    //   "decimals": 6,
    //   "symbol": "WETH",
    //   "type": "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::WETH",
    //   "order": 50
    // },
    // {
    //   "source": "celar",
    //   "chainId": 1,
    //   "name": "Wrapper Ether",
    //   "decimals": 8,
    //   "symbol": "WETH",
    //   "type": "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::WethCoin",
    //   "order": 50
    // },
    // {
    //   "source": "wormhole",
    //   "chainId": 1,
    //   "name": "Wrapped Ether",
    //   "decimals": 8,
    //   "symbol": "WETH",
    //   "type": "0xcc8a89c8dce9693d354449f1f73e60e14e347417854f029db5bc8e7454008abb::coin::T",
    //   "order": 50
    // },
    // {
    //   "source": "celar",
    //   "chainId": 1,
    //   "name": "Binance USD",
    //   "decimals": 8,
    //   "symbol": "BUSD",
    //   "type": "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::BusdCoin",
    //   "order": 60
    // },
    // {
    //   "source": "wormhole",
    //   "chainId": 1,
    //   "name": "Solana",
    //   "decimals": 8,
    //   "symbol": "SOL",
    //   "type": "0xdd89c0e695df0692205912fb69fc290418bed0dbe6e4573d744a6d5e6bab6c13::coin::T",
    //   "order": 1000
    // },
    // {
    //   "source": "ditto",
    //   "chainId": 1,
    //   "name": "Ditto Staked Aptos",
    //   "decimals": 8,
    //   "symbol": "stAPT",
    //   "type": "0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5::staked_coin::StakedAptos",
    //   "order": 1000
    // },
    // {
    //   "source": "mojito",
    //   "chainId": 1,
    //   "name": "Mojito",
    //   "decimals": 8,
    //   "symbol": "MOJO",
    //   "type": "0x881ac202b1f1e6ad4efcff7a1d0579411533f2502417a19211cfc49751ddb5f4::coin::MOJO",
    //   "order": 1000
    // },
    // {
    //   "source": "chainx",
    //   "chainId": 1,
    //   "name": "XBTC",
    //   "decimals": 8,
    //   "symbol": "XBTC",
    //   "type": "0x7c2aaaaf3f019bbf7f02beed21fc4ec352cc38272f93cb11e61ec7c89bfe5f4b::xbtc::XBTC",
    //   "order": 1000
    // },
    // {
    //   "source": "aptoge",
    //   "chainId": 1,
    //   "name": "Aptoge",
    //   "decimals": 6,
    //   "symbol": "APTOGE",
    //   "type": "0x5c738a5dfa343bee927c39ebe85b0ceb95fdb5ee5b323c95559614f5a77c47cf::Aptoge::Aptoge",
    //   "order": 1000
    // },
    // {
    //   "source": "argo",
    //   "chainId": 1,
    //   "name": "Argo USD",
    //   "decimals": 6,
    //   "symbol": "USDA",
    //   "type": "0x1000000fa32d122c18a6a31c009ce5e71674f22d06a581bb0a15575e6addadcc::usda::USDA",
    //   "order": 1000
    // },
    // {
    //   "source": "tortuga",
    //   "chainId": 1,
    //   "name": "Tortuga Staked APT",
    //   "decimals": 8,
    //   "symbol": "tAPT",
    //   "type": "0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin",
    //   "order": 1000
    // },
    // {
    //   "source": "partners",
    //   "chainId": 1,
    //   "name": "Decentralized USD",
    //   "decimals": 6,
    //   "symbol": "USDD",
    //   "type": "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDD",
    //   "order": 1000
    // },
    // {
    //   "source": "celar",
    //   "chainId": 1,
    //   "name": "Binance Coin",
    //   "decimals": 8,
    //   "symbol": "BNB",
    //   "type": "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::BnbCoin",
    //   "order": 1000
    // }
  ]