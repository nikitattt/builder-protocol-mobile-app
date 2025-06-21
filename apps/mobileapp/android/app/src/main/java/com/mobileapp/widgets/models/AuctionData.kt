package com.mobileapp.widgets.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class AuctionData(
    val id: Int,
    @SerialName("amount") val currentBid: Double,
    val bidder: String,
    val endTime: Double,
    val image: String,
    val duration: Int
)

@Serializable
data class DaoInfo(
    val name: String
)

@Serializable
data class AuctionGovernanceApiResponse(
    val dao: DaoInfo,
    val auction: AuctionData,
    val governance: GovernanceData
) 