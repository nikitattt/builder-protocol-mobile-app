package com.mobileapp.widgets.governance

import android.content.Context
import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
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
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.mobileapp.widgets.common.WidgetDataLoader
import com.mobileapp.widgets.common.ui.ProposalView
import com.mobileapp.widgets.models.ProposalData

class GovernanceWidget : GlanceAppWidget() {

    override val stateDefinition = GovernanceStateDefinition

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            val currentState = currentState<GovernanceInfo>()
//            Log.d("GovernanceWidget", "current state: $currentState")
            val daoAddress = currentState.daoAddress
            val daoName = currentState.daoName
            val chainId = currentState.chainId

            var proposals: List<ProposalData>? = null
            LaunchedEffect(daoAddress, chainId) {
                if (daoAddress != null && chainId != null) {
                    proposals = fetchData(context, daoAddress, chainId)
                }

            }

            WidgetShell {
                when {
                    daoAddress == null || daoName == null || chainId == null -> {
                        NotConfiguredState()
                    }
                    else -> {
                        if (proposals == null) {
                            ErrorState()
                        } else {
                            Content(
                                daoName = daoName,
                                proposals = proposals!!
                            )
                        }
                    }
                }
            }
        }
    }

    private suspend fun fetchData(context: Context, address: String, chainId: Int): List<ProposalData>? {
        val dataLoader = WidgetDataLoader(context)
        return dataLoader.fetchGovernanceData(address, chainId)
    }

    @Composable
    private fun Content(daoName: String, proposals: List<ProposalData>) {
        val activeProps = proposals.count { it.state == "ACTIVE" }
        val pendingProps = proposals.count { it.state == "PENDING" }

        Column(modifier = GlanceModifier.fillMaxSize()) {
            Row(modifier = GlanceModifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = daoName,
                    style = TextStyle(
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = ColorProvider(Color.Black, Color.White)
                    )
                )
                Spacer(modifier = GlanceModifier.defaultWeight())
                if (activeProps > 0) {
                    Text(
                        "Active",
                        modifier = GlanceModifier.padding(end = 4.dp),
                        style = TextStyle(
                            fontSize = 12.sp, 
                            color = ColorProvider(Color(0xFF8C8C8C), Color(0xFF8C8C8C))
                        )
                    )
                    Text(
                        activeProps.toString(),
                        style = TextStyle(
                            fontSize = 12.sp,
                            color = ColorProvider(Color.Black, Color.White)
                        )
                    )
                }
                if (pendingProps > 0) {
                    Text(
                        "Pending",
                        modifier = GlanceModifier.padding(end = 4.dp, start = 8.dp),
                        style = TextStyle(
                            fontSize = 12.sp,
                            color = ColorProvider(Color(0xFF8C8C8C), Color(0xFF8C8C8C))
                        )
                    )
                    Text(
                        pendingProps.toString(),
                        style = TextStyle(
                            fontSize = 12.sp,
                            color = ColorProvider(Color.Black, Color.White)
                        )
                    )
                }
            }

            Spacer(modifier = GlanceModifier.height(4.dp))
            Box(
                modifier = GlanceModifier
                    .height(1.dp)
                    .background(ColorProvider(Color(0xFFCCCCCC), Color(0xFF141414)))
                    .fillMaxWidth()
            ) {}
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
                        ProposalView(proposal = proposal)
                    }
                }
            }
        }
    }

    @Composable
    private fun NotConfiguredState() {
        Box(
            modifier = GlanceModifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text(
                "Error happened. Please add widget again.",
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

private fun GlanceId.toInt(): Int {
    val idString = this.toString()
        .substringAfter("appWidgetId=")
        .substringBefore(")")
    return idString.toInt()
}
