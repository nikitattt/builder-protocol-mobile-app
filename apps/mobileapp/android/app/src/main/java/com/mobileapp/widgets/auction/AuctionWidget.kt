package com.mobileapp.widgets.auction

import android.content.Context
import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.color.ColorProvider
import androidx.glance.currentState
import androidx.glance.layout.Alignment
import androidx.glance.layout.Box
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.padding
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.mobileapp.widgets.auction.ui.AuctionView
import com.mobileapp.widgets.common.DaoConfig
import com.mobileapp.widgets.common.DaoWidgetStateDefinition
import com.mobileapp.widgets.common.WidgetDataLoader
import com.mobileapp.widgets.models.AuctionData
import androidx.compose.runtime.LaunchedEffect
import androidx.glance.appwidget.SizeMode


class AuctionWidget : GlanceAppWidget() {
    override val stateDefinition = DaoWidgetStateDefinition

    override val sizeMode = SizeMode.Exact

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            val config = currentState<DaoConfig>()

            val daoAddress = config.daoAddress
            val daoName = config.daoName
            val chainId = config.chainId

            var auction: AuctionData? by remember { mutableStateOf(null) }
            var numberOfProposals: Int? by remember { mutableStateOf(null) }
            var isLoading by remember(daoAddress, chainId) { mutableStateOf(true) }
            var hasError by remember(daoAddress, chainId) { mutableStateOf(false) }

            LaunchedEffect(daoAddress, chainId) {
                if (daoAddress != null && chainId != null) {
                    isLoading = true
                    hasError = false
                    val data = WidgetDataLoader(context)
                        .fetchAuctionGovernanceData(daoAddress, chainId)
                    if (data != null) {
                        auction = data.auction
                        numberOfProposals = data.governance.proposals.size
                    } else {
                        hasError = true
                    }
                    isLoading = false
                } else {
                    isLoading = false
                }
            }

            WidgetShell {
                when {
                    daoAddress == null || daoName == null || chainId == null -> {
                        NotConfiguredState()
                    }
                    isLoading -> {
                        LoadingState()
                    }
                    hasError || auction == null || numberOfProposals == null -> {
                        ErrorState()
                    }
                    else -> {
                        Content(auction = auction!!, numberOfProposals!!)
                    }
                }
            }
        }
    }

    @Composable
    private fun Content(auction: AuctionData, numberOfProposals: Int) {
        AuctionView(auction = auction, numberOfProposals)
    }

    @Composable
    private fun LoadingState() {
        Box(
            modifier = GlanceModifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                "Loading...",
                style = TextStyle(
                    color = ColorProvider(Color.LightGray, Color.DarkGray)
                )
            )
        }
    }

    @Composable
    private fun NotConfiguredState() {
        Box(
            modifier = GlanceModifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                "Select a DAO to display",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    color = ColorProvider(Color.Black, Color.White)
                )
            )
        }
    }

    @Composable
    private fun ErrorState() {
        Box(
            modifier = GlanceModifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                "Error happened",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    color = ColorProvider(Color.Black, Color.White)
                )
            )
        }
    }

    @Composable
    private fun WidgetShell(content: @Composable () -> Unit) {
        Box(
            modifier = GlanceModifier
                .fillMaxSize()
                .background(ColorProvider(Color.White, Color.Black))
                .padding(16.dp)
        ) {
            content()
        }
    }
} 