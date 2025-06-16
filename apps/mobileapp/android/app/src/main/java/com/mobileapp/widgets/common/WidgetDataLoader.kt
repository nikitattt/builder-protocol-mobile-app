package com.mobileapp.widgets.common

import android.content.Context
import com.mobileapp.widgets.models.GovernanceApiResponse
import com.mobileapp.widgets.models.ProposalData
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

class WidgetDataLoader(private val context: Context) {

    private val baseApiUrl = "https://api.builderapp.wtf"

    private val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                prettyPrint = true
            })
        }
    }

    suspend fun fetchGovernanceData(daoAddress: String, chainId: Int): List<ProposalData>? {
        val chain = getChainString(chainId)
        val url = "$baseApiUrl/dao/$chain/$daoAddress?data=governance"

        return try {
            val response = client.get(url).body<GovernanceApiResponse>()
            response.governance.proposals.sortedBy { it.number }
        } catch (e: Exception) {
            // In a real app, you'd want to log this error
            e.printStackTrace()
            null
        }
    }

    private fun getChainString(chainId: Int): String {
        return when (chainId) {
            1 -> "ethereum"
            10 -> "optimism"
            8453 -> "base"
            7777777 -> "zora"
            else -> "ethereum" // Default or throw an error
        }
    }
} 