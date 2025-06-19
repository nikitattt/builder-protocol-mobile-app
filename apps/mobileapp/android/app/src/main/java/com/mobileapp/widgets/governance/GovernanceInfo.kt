package com.mobileapp.widgets.governance

import kotlinx.serialization.Serializable

@Serializable
data class GovernanceInfo(
    val daoAddress: String? = null,
    val daoName: String? = null,
    val chainId: Int? = null,
) 