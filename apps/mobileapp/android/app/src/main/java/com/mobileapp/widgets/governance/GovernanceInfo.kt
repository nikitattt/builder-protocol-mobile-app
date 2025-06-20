package com.mobileapp.widgets.governance

import com.mobileapp.widgets.models.ProposalData
import kotlinx.serialization.Serializable

@Serializable
data class GovernanceInfo(
    val daoAddress: String? = null,
    val daoName: String? = null,
    val chainId: Int? = null
) 