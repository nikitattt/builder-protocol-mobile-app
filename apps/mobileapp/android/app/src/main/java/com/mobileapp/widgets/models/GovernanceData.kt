package com.mobileapp.widgets.models

import kotlinx.serialization.Serializable

@Serializable
data class ProposalVotes(
    val yes: Int,
    val no: Int,
    val abstain: Int
)

@Serializable
data class ProposalData(
    val id: String,
    val number: Int,
    val title: String,
    val state: String,
    val endTime: Double,
    val quorum: Int,
    val votes: ProposalVotes?
)

@Serializable
data class GovernanceData(
    val proposals: List<ProposalData>
)

@Serializable
data class GovernanceApiResponse(
    val governance: GovernanceData
) 