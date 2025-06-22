package com.mobileapp.widgets.common

import kotlinx.serialization.Serializable

@Serializable
data class DaoConfig (
    val daoAddress: String? = null,
    val daoName: String? = null,
    val chainId: Int? = null
) 