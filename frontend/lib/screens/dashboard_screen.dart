import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/target_provider.dart';
import '../providers/analysis_provider.dart';
import '../widgets/dominance_gauge.dart';
import '../widgets/psychological_state_indicator.dart';
import '../widgets/next_move_card.dart';
import '../widgets/quick_actions.dart';

/// Main Dashboard Screen - The Command Center
/// 
/// Displays:
/// - Target's psychological state
/// - Dominance level gauge
/// - Next recommended tactical move
/// - Quick action buttons
class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadDashboardData();
  }

  Future<void> _loadDashboardData() async {
    final targetProvider = Provider.of<TargetProvider>(context, listen: false);
    final analysisProvider = Provider.of<AnalysisProvider>(context, listen: false);
    
    await targetProvider.loadTargetProfile();
    await analysisProvider.loadLatestAnalysis();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'CHIRON OMEGA',
          style: TextStyle(
            letterSpacing: 2.0,
            fontWeight: FontWeight.w900,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => Navigator.pushNamed(context, '/settings'),
          ),
        ],
      ),
      body: _selectedIndex == 0 ? _buildDashboard() : _buildOtherScreens(),
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildDashboard() {
    return RefreshIndicator(
      onRefresh: _loadDashboardData,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Target Info Header
            _buildTargetHeader(),
            
            const SizedBox(height: 24),
            
            // Psychological State Indicator
            const PsychologicalStateIndicator(),
            
            const SizedBox(height: 24),
            
            // Dominance Gauge
            const DominanceGauge(),
            
            const SizedBox(height: 24),
            
            // Next Move Card
            const NextMoveCard(),
            
            const SizedBox(height: 24),
            
            // Quick Actions
            const QuickActions(),
            
            const SizedBox(height: 24),
            
            // Recent Activity
            _buildRecentActivity(),
          ],
        ),
      ),
    );
  }

  Widget _buildTargetHeader() {
    return Consumer<TargetProvider>(
      builder: (context, targetProvider, child) {
        final target = targetProvider.currentTarget;
        
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                // Target Avatar
                CircleAvatar(
                  radius: 30,
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  child: Text(
                    target?.name?.substring(0, 1).toUpperCase() ?? 'T',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                ),
                
                const SizedBox(width: 16),
                
                // Target Info
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        target?.name ?? 'Target Profile',
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        '${target?.age ?? '--'} • ${target?.zodiacSign ?? '--'}',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        target?.archetype ?? 'Loading...',
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.primary,
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
                
                // Edit Button
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () => Navigator.pushNamed(context, '/profile'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildRecentActivity() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Recent Activity',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            TextButton(
              onPressed: () => Navigator.pushNamed(context, '/interactions'),
              child: const Text('View All'),
            ),
          ],
        ),
        
        const SizedBox(height: 12),
        
        Consumer<AnalysisProvider>(
          builder: (context, analysisProvider, child) {
            final recentInteractions = analysisProvider.recentInteractions;
            
            if (recentInteractions.isEmpty) {
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Center(
                    child: Column(
                      children: [
                        Icon(
                          Icons.history,
                          size: 48,
                          color: Colors.white30,
                        ),
                        const SizedBox(height: 12),
                        Text(
                          'No recent activity',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }
            
            return Column(
              children: recentInteractions.take(3).map((interaction) {
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  child: ListTile(
                    leading: Icon(
                      _getInteractionIcon(interaction.type),
                      color: Theme.of(context).colorScheme.primary,
                    ),
                    title: Text(interaction.title),
                    subtitle: Text(interaction.timestamp),
                    trailing: _getOutcomeChip(interaction.outcome),
                  ),
                );
              }).toList(),
            );
          },
        ),
      ],
    );
  }

  IconData _getInteractionIcon(String type) {
    switch (type) {
      case 'message':
        return Icons.message;
      case 'call':
        return Icons.phone;
      case 'meeting':
        return Icons.people;
      default:
        return Icons.chat_bubble;
    }
  }

  Widget _getOutcomeChip(String outcome) {
    Color color;
    switch (outcome.toLowerCase()) {
      case 'success':
        color = Colors.green;
        break;
      case 'failure':
        color = Colors.red;
        break;
      default:
        color = Colors.orange;
    }
    
    return Chip(
      label: Text(
        outcome,
        style: const TextStyle(fontSize: 11, color: Colors.white),
      ),
      backgroundColor: color,
      padding: EdgeInsets.zero,
    );
  }

  Widget _buildOtherScreens() {
    // Placeholder for other bottom nav screens
    return Center(
      child: Text(
        'Screen ${_selectedIndex + 1}',
        style: Theme.of(context).textTheme.displayMedium,
      ),
    );
  }

  Widget _buildBottomNav() {
    return BottomNavigationBar(
      currentIndex: _selectedIndex,
      onTap: (index) => setState(() => _selectedIndex = index),
      type: BottomNavigationBarType.fixed,
      backgroundColor: const Color(0xFF1A1A1A),
      selectedItemColor: const Color(0xFFB8860B),
      unselectedItemColor: Colors.white30,
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.dashboard),
          label: 'Dashboard',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.book),
          label: 'Codex',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.history),
          label: 'Log',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.analytics),
          label: 'Analysis',
        ),
      ],
    );
  }
}
