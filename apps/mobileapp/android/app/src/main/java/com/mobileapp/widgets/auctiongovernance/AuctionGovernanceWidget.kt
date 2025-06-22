package com.mobileapp.widgets.auctiongovernance

import android.content.Context
import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.lazy.LazyColumn
import androidx.glance.appwidget.lazy.items
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.color.ColorProvider
import androidx.glance.currentState
import androidx.glance.layout.Alignment
import androidx.glance.layout.Box
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.layout.padding
import androidx.glance.layout.width
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.mobileapp.widgets.auctiongovernance.ui.AuctionView
import com.mobileapp.widgets.common.DaoConfig
import com.mobileapp.widgets.common.DaoWidgetStateDefinition
import com.mobileapp.widgets.common.WidgetDataLoader
import com.mobileapp.widgets.common.ui.ProposalView
import com.mobileapp.widgets.common.ui.ProposalDisplayType
import com.mobileapp.widgets.models.AuctionData
import com.mobileapp.widgets.models.ProposalData

class AuctionGovernanceWidget : GlanceAppWidget() {
    override val stateDefinition = DaoWidgetStateDefinition

    override suspend fun onDelete(context: Context, id: GlanceId) {
        super.onDelete(context, id)
        stateDefinition.getLocation(context, id.toString()).delete()
    }

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            val config = currentState<DaoConfig>()

            val daoAddress = config.daoAddress
            val daoName = config.daoName
            val chainId = config.chainId

            var auction: AuctionData? by remember { mutableStateOf(null) }
            var proposals: List<ProposalData>? by remember { mutableStateOf(null) }
            var isLoading by remember(daoAddress, chainId) { mutableStateOf(true) }

            LaunchedEffect(daoAddress, chainId) {
                if (daoAddress != null && chainId != null) {
                    isLoading = true
                    val data = fetchData(context, daoAddress, chainId)
                    if (data != null) {
                        auction = data.auction
                        proposals = data.governance.proposals
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
                    auction != null && proposals != null -> {
                        Content(
                            auction = auction!!,
                            proposals = proposals!!
                        )
                    }
                    else -> {
                        ErrorState()
                    }
                }
            }
        }
    }

    private suspend fun fetchData(context: Context, address: String, chainId: Int) =
        WidgetDataLoader(context).fetchAuctionGovernanceData(address, chainId)

    @Composable
    private fun Content(auction: AuctionData, proposals: List<ProposalData>) {
        Column(modifier = GlanceModifier.fillMaxSize()) {
            AuctionView(auction = auction)

            Spacer(modifier = GlanceModifier.height(4.dp))

            Row(
                modifier = GlanceModifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    "Active Proposals",
                    style = TextStyle(
                        fontSize = 12.sp,
                        color = ColorProvider(Color(0xFF8C8C8C), Color(0xFF8C8C8C))
                    )
                )
                Spacer(modifier = GlanceModifier.width(4.dp))
                Box(
                    modifier = GlanceModifier
                        .height(1.dp)
                        .background(ColorProvider(Color(0xFFCCCCCC), Color(0xFF141414)))
                        .fillMaxWidth()
                ) {}
            }
            Spacer(modifier = GlanceModifier.height(4.dp))

            if (proposals.isEmpty()) {
                Text(
                    "All done. No Active or Pending props ⌐◨-◨",
                    style = TextStyle(
                        fontSize = 12.sp,
                        color = ColorProvider(Color.Black, Color.White)
                    )
                )
            } else {
                LazyColumn {
                    items(proposals) { proposal ->
                        ProposalView(proposal = proposal, displayType = ProposalDisplayType.COMPACT)
                    }
                }
            }
        }
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
                "Select DAO to display",
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