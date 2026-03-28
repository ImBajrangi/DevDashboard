package com.devdashboard.nexus.ui.feed

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.tooling.preview.Preview
import com.devdashboard.nexus.ui.theme.*

data class Transmission(
    val id: String,
    val source: String,
    val message: String,
    val timestamp: String
)

@Preview(showBackground = true)
@Composable
fun TransmissionFeedScreenPreview() {
    NexusTheme {
        TransmissionFeedScreen()
    }
}

@Composable
fun TransmissionFeedScreen() {
    val transmissions = listOf(
        Transmission("1", "SAT_COM_1", "BUFFERING NEXUS STREAM...", "04:21:00"),
        Transmission("2", "FIREBASE_SEC", "HEARTBEAT DETECTED", "04:21:05"),
        Transmission("3", "SUPABASE_RT", "CONNECTION STABLE", "04:21:10")
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Obsidian)
            .padding(16.dp)
    ) {
        Text(
            text = "TRANS_FEED_V1",
            color = Gold,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(transmissions) { trans ->
                TransmissionCard(trans)
            }
        }
    }
}

@Composable
fun TransmissionCard(transmission: Transmission) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(Glass)
            .border(1.dp, Border)
            .padding(12.dp)
    ) {
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = transmission.source,
                    color = Cyan,
                    style = MaterialTheme.typography.labelSmall
                )
                Text(
                    text = transmission.timestamp,
                    color = TextSecondary,
                    fontSize = 10.sp
                )
            }
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = transmission.message,
                color = TextPrimary,
                style = MaterialTheme.typography.bodyLarge
            )
        }
    }
}
