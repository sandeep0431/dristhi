import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { SimulationState, Well, Formation } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DemoControls } from './components/DemoControls';
import { GuidedTourModal } from './components/GuidedTourModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LiveMonitorPage } from './pages/LiveMonitorPage';
import { WellExplorerPage } from './pages/WellExplorerPage';
import { WellTwinPage } from './pages/WellTwinPage';
import { RiskHorizonPage } from './pages/RiskHorizonPage';
import { TimeMachinePage } from './pages/TimeMachinePage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { SafetyContextPage } from './pages/SafetyContextPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { ReportsPage } from './pages/ReportsPage';
import { fallbackTwinResults, fallbackWells, fallbackFormations } from './services/fallbackData';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);
  const [wells, setWells] = useState<Well[]>(fallbackWells);
  const [formations, setFormations] = useState<Formation[]>(fallbackFormations);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Initialize data on mount
  useEffect(() => {
    const initData = async () => {
      const state = await api.getSimulationState();
      setSimulationState(state);
      const wList = await api.getWells();
      if (wList && wList.length > 0) setWells(wList);
      const fList = await api.getFormations();
      if (fList && fList.length > 0) setFormations(fList);
    };
    initData();
  }, []);

  // Periodic telemetry polling / simulation step tick
  useEffect(() => {
    const timer = setInterval(async () => {
      if (simulationState && simulationState.is_running) {
        const nextState = await api.stepSimulation();
        setSimulationState({ ...nextState });
      } else {
        const nextState = await api.getSimulationState();
        setSimulationState({ ...nextState });
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [simulationState?.is_running]);

  // Handle Scenario Change
  const handleScenarioChange = async (scenario: 'normal' | 'torque_anomaly' | 'risk_zone' | 'combined', depth?: number) => {
    const updated = await api.setScenario(scenario, depth);
    setSimulationState({ ...updated });
  };

  // Handle Depth Change
  const handleDepthChange = async (depth: number) => {
    const updated = await api.setDepth(depth);
    setSimulationState({ ...updated });
  };

  // Handle Play / Pause / Reset / Step
  const handleStart = async () => {
    const updated = await api.startSimulation();
    setSimulationState({ ...updated });
  };

  const handlePause = async () => {
    const updated = await api.pauseSimulation();
    setSimulationState({ ...updated });
  };

  const handleReset = async () => {
    const updated = await api.resetSimulation();
    setSimulationState({ ...updated });
  };

  const handleStep = async () => {
    const updated = await api.stepSimulation();
    setSimulationState({ ...updated });
  };

  if (!simulationState) {
    return (
      <div className="min-h-screen bg-[#030817] flex items-center justify-center text-white font-mono text-sm">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-[#4DA3FF] animate-ping" />
          <span>DRISHTI-NWIS Initializing Operational Environment...</span>
        </div>
      </div>
    );
  }

  // Render Landing Page if currentRoute is '/'
  if (currentRoute === '/') {
    return (
      <>
        <LandingPage
          onOpenOperations={() => setCurrentRoute('/dashboard')}
          onExploreFeature={(route) => setCurrentRoute(route)}
        />
        <GuidedTourModal
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onNavigate={(route) => setCurrentRoute(route)}
          onTriggerScenario={handleScenarioChange}
        />
      </>
    );
  }

  // Render Dashboard / Operations Layout
  return (
    <div className="min-h-screen bg-[#030817] text-[#F5F8FF] flex flex-col">
      {/* Top Header */}
      <Header
        simulationState={simulationState}
        onOpenTour={() => setIsTourOpen(true)}
        onReset={handleReset}
        currentRoute={currentRoute}
        onNavigate={(route) => setCurrentRoute(route)}
      />

      {/* Main Workspace: Left Sidebar + Center Page Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={(route) => setCurrentRoute(route)}
          isAnomalyActive={simulationState.anomaly.is_anomaly}
        />

        {/* Center Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#030817]">
          {/* Floating / Sticky Demo Controls Bar */}
          <div className="p-6 pb-0 max-w-7xl mx-auto">
            <DemoControls
              state={simulationState}
              onScenarioChange={handleScenarioChange}
              onDepthChange={handleDepthChange}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onStep={handleStep}
            />
          </div>

          {/* Current Page View */}
          {currentRoute === '/dashboard' && (
            <DashboardPage
              state={simulationState}
              wells={wells}
              formations={formations}
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}

          {currentRoute === '/live' && (
            <LiveMonitorPage
              state={simulationState}
              onNavigate={(route) => setCurrentRoute(route)}
              onScenarioChange={handleScenarioChange}
              onDepthChange={handleDepthChange}
            />
          )}

          {currentRoute === '/wells' && (
            <WellExplorerPage
              wells={wells}
              onSelectWell={(wellId) => {}}
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}

          {currentRoute === '/welltwin' && (
            <WellTwinPage
              twins={fallbackTwinResults}
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}

          {currentRoute === '/risk' && (
            <RiskHorizonPage
              state={simulationState}
              onNavigate={(route) => setCurrentRoute(route)}
              onDepthChange={handleDepthChange}
            />
          )}

          {currentRoute === '/time-machine' && (
            <TimeMachinePage
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}

          {currentRoute === '/graph' && (
            <KnowledgeGraphPage
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}

          {currentRoute === '/safety' && (
            <SafetyContextPage
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}

          {currentRoute === '/assistant' && (
            <AiAssistantPage
              onNavigate={(route) => setCurrentRoute(route)}
              currentDepth={simulationState.depth}
            />
          )}

          {currentRoute === '/reports' && (
            <ReportsPage
              onNavigate={(route) => setCurrentRoute(route)}
            />
          )}
        </main>
      </div>

      {/* Guided Tour Modal */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigate={(route) => setCurrentRoute(route)}
        onTriggerScenario={handleScenarioChange}
      />
    </div>
  );
};

export default App;
