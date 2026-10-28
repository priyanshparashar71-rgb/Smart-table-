import React, { useState } from 'react';
import {
  ScreenType,
  TableItem,
  MenuItem,
  KitchenTicketData,
  WaiterCallItem,
} from './types';
import {
  INITIAL_TABLES,
  INITIAL_MENU_ITEMS,
  INITIAL_KITCHEN_TICKETS,
  INITIAL_WAITER_CALLS,
} from './data/mockData';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { TablesQRScreen } from './screens/TablesQRScreen';
import { MenuCatalogScreen } from './screens/MenuCatalogScreen';
import { KitchenDisplayScreen } from './screens/KitchenDisplayScreen';
import { WaiterCallsScreen } from './screens/WaiterCallsScreen';
import { DashboardOverviewScreen } from './screens/DashboardOverviewScreen';
import { CustomerReviewsScreen } from './screens/CustomerReviewsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { GuestMobilePreviewModal } from './components/GuestMobilePreviewModal';
import { playChime } from './utils/audio';

export default function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('tables-qr');

  // Shared state
  const [tables, setTables] = useState<TableItem[]>(INITIAL_TABLES);
  const [selectedTable, setSelectedTable] = useState<TableItem>(
    INITIAL_TABLES.find((t) => t.id === 'T05') || INITIAL_TABLES[0]
  );

  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
    INITIAL_MENU_ITEMS[0]
  );

  const [kitchenTickets, setKitchenTickets] = useState<KitchenTicketData[]>(
    INITIAL_KITCHEN_TICKETS
  );

  const [waiterCalls, setWaiterCalls] = useState<WaiterCallItem[]>(
    INITIAL_WAITER_CALLS
  );

  const [audioAlertsOn, setAudioAlertsOn] = useState(true);
  const [isGuestSimulatorOpen, setIsGuestSimulatorOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(
    'The Rustic Olive - Main St.'
  );

  // Table handlers
  const handleSelectTable = (table: TableItem) => {
    setSelectedTable(table);
  };

  const handleAddTable = (newTable: TableItem) => {
    setTables((prev) => [...prev, newTable]);
    setSelectedTable(newTable);
    if (audioAlertsOn) playChime(true);
  };

  const handleAcknowledgeAlert = (table: TableItem) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === table.id
          ? {
              ...t,
              hasCallAlert: false,
              stateLabel: 'Occupied (Assistance Attended)',
            }
          : t
      )
    );
    setWaiterCalls((prev) =>
      prev.map((c) =>
        c.tableId === table.id ? { ...c, status: 'acknowledged' } : c
      )
    );
  };

  const handleToggleTableStatus = (table: TableItem) => {
    const updatedStatus: 'active' | 'inactive' = table.status === 'active' ? 'inactive' : 'active';
    const updated: TableItem = {
      ...table,
      status: updatedStatus,
      stateLabel:
        updatedStatus === 'active'
          ? 'Ready for Guests'
          : 'VIP Tasting Reservation (8:00 PM)  Access Paused',
    };
    setTables((prev) => prev.map((t) => (t.id === table.id ? updated : t)));
    if (selectedTable.id === table.id) {
      setSelectedTable(updated);
    }
  };

  // Menu item handlers
  const handleSelectItem = (item: MenuItem) => {
    setSelectedMenuItem(item);
  };

  const handleSaveItem = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((i) => (i.id === updatedItem.id ? updatedItem : i))
    );
    setSelectedMenuItem(updatedItem);
  };

  const handleToggleStock = (item: MenuItem) => {
    const updated: MenuItem = {
      ...item,
      inStock: !item.inStock,
      stockNote: !item.inStock ? undefined : 'Depleted Kitchen Stock',
    };
    setMenuItems((prev) => prev.map((i) => (i.id === item.id ? updated : i)));
    if (selectedMenuItem?.id === item.id) {
      setSelectedMenuItem(updated);
    }
  };

  const handleDuplicateItem = (item: MenuItem) => {
    const copy: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
      name: `${item.name} (Copy)`,
      soldThisWeek: 0,
    };
    setMenuItems((prev) => [copy, ...prev]);
    setSelectedMenuItem(copy);
  };

  const handleDeleteItem = (item: MenuItem) => {
    if (confirm(`Remove "${item.name}" from the active menu?`)) {
      setMenuItems((prev) => prev.filter((i) => i.id !== item.id));
      if (selectedMenuItem?.id === item.id) {
        setSelectedMenuItem(null);
      }
    }
  };

  const handleAddNewMenuItem = () => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: 'Artisan Wood-Fired Special',
      category: 'Main Course',
      price: 24.0,
      dietary: 'vegetarian',
      description: 'Hand-crafted daily creation using fresh seasonal harvest and hearth-baked artisanal crust.',
      allergens: ['Dairy', 'Gluten'],
      inStock: true,
      soldThisWeek: 0,
      image: '/src/assets/images/wild_mushroom_pizza_1792735856186.jpg',
      fileDetails: 'special-dish... 1.9 MB • 2400x2400 WebP',
    };
    setMenuItems((prev) => [newItem, ...prev]);
    setSelectedMenuItem(newItem);
  };

  // KDS handlers
  const handleUpdateTicketStatus = (
    ticketId: string,
    newStatus: KitchenTicketData['status']
  ) => {
    setKitchenTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          let timeLabel = t.timeLabel;
          if (newStatus === 'in_cook') timeLabel = 'COOKING NOW';
          if (newStatus === 'ready') timeLabel = 'READY JUST NOW';
          if (newStatus === 'delivered') timeLabel = 'DELIVERED';
          return { ...t, status: newStatus, timeLabel };
        }
        return t;
      })
    );
  };

  // Waiter Call handlers
  const handleResolveCall = (callId: string) => {
    const targetCall = waiterCalls.find((c) => c.id === callId);
    setWaiterCalls((prev) => prev.filter((c) => c.id !== callId));
    if (targetCall) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === targetCall.tableId
            ? { ...t, hasCallAlert: false, stateLabel: 'Assistance Completed' }
            : t
        )
      );
    }
  };

  const handleAcknowledgeCall = (callId: string) => {
    setWaiterCalls((prev) =>
      prev.map((c) =>
        c.id === callId
          ? { ...c, status: 'acknowledged', serverAssigned: 'Elena Rostova' }
          : c
      )
    );
  };

  // Guest simulator orders
  const handleGuestPlaceOrder = (
    tableId: string,
    orderEntries: { item: MenuItem; count: number }[]
  ) => {
    const newTicket: KitchenTicketData = {
      id: `ST-${Math.floor(1000 + Math.random() * 9000)}`,
      tableId,
      orderSource: 'QR Self-Order (Live)',
      status: 'just_in',
      timeLabel: 'JUST IN (0M)',
      stationTag: 'Pizza Oven • Grill',
      items: orderEntries.map((e, idx) => ({
        id: `entry-${Date.now()}-${idx}`,
        count: e.count,
        name: e.item.name,
        dietary: e.item.dietary,
        subtext: 'Direct table-side mobile order',
      })),
    };

    setKitchenTickets((prev) => [newTicket, ...prev]);

    // Update table state
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              occupancyState: 'live-session',
              stateLabel: `Live Session Active (Order #${newTicket.id})`,
              activeOrderNumber: `#${newTicket.id}`,
            }
          : t
      )
    );

    if (audioAlertsOn) {
      playChime(true);
    }
  };

  const handleGuestCallWaiter = (
    tableId: string,
    type: 'water' | 'bill' | 'server'
  ) => {
    const newCall: WaiterCallItem = {
      id: `wc-${Date.now()}`,
      tableId,
      tableName: `Table ${tableId}`,
      zone: 'Main Dining (Chef Island)',
      type,
      requestedAt: 'Just now',
      status: 'pending',
    };

    setWaiterCalls((prev) => [newCall, ...prev]);

    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              hasCallAlert: true,
              callAlert:
                type === 'water'
                  ? 'Water Refill'
                  : type === 'bill'
                  ? 'Bill Request'
                  : 'Assistance',
              stateLabel: `Waiter Assistance Requested (Just now)`,
            }
          : t
      )
    );

    if (audioAlertsOn) {
      playChime(true);
    }
  };

  const pendingCallsCount = waiterCalls.filter((c) => c.status === 'pending').length;
  const pendingKitchenCount = kitchenTickets.filter(
    (t) => t.status !== 'delivered'
  ).length;

  return (
    <div className="min-h-screen bg-[#f9f9fc] flex flex-col font-sans">
      {/* Top Header */}
      <TopNav
        audioAlertsOn={audioAlertsOn}
        onToggleAudioAlerts={() => setAudioAlertsOn(!audioAlertsOn)}
        onOpenGuestSimulator={() => setIsGuestSimulatorOpen(true)}
        currentLocation={currentLocation}
        onSelectLocation={setCurrentLocation}
      />

      {/* Main Body with Sidebar & Screen Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          onSelectScreen={setCurrentScreen}
          pendingKitchenCount={pendingKitchenCount}
          pendingWaiterCallsCount={pendingCallsCount}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentScreen === 'tables-qr' && (
              <TablesQRScreen
                tables={tables}
                selectedTable={selectedTable}
                onSelectTable={handleSelectTable}
                onAddTable={handleAddTable}
                onAcknowledgeAlert={handleAcknowledgeAlert}
                onToggleStatus={handleToggleTableStatus}
              />
            )}

            {currentScreen === 'menu-management' && (
              <MenuCatalogScreen
                menuItems={menuItems}
                selectedItem={selectedMenuItem}
                onSelectItem={handleSelectItem}
                onSaveItem={handleSaveItem}
                onToggleStock={handleToggleStock}
                onDuplicateItem={handleDuplicateItem}
                onDeleteItem={handleDeleteItem}
                onAddNewItem={handleAddNewMenuItem}
              />
            )}

            {currentScreen === 'kitchen-kds' && (
              <KitchenDisplayScreen
                tickets={kitchenTickets}
                onUpdateStatus={handleUpdateTicketStatus}
                audioAlertsOn={audioAlertsOn}
                onToggleAudioAlerts={() => setAudioAlertsOn(!audioAlertsOn)}
              />
            )}

            {currentScreen === 'waiter-calls' && (
              <WaiterCallsScreen
                calls={waiterCalls}
                onResolveCall={handleResolveCall}
                onAcknowledgeCall={handleAcknowledgeCall}
              />
            )}

            {currentScreen === 'dashboard-overview' && (
              <DashboardOverviewScreen
                tables={tables}
                menuItems={menuItems}
                onNavigate={setCurrentScreen}
              />
            )}

            {currentScreen === 'customer-reviews' && <CustomerReviewsScreen />}

            {currentScreen === 'settings' && (
              <SettingsScreen
                restaurantName="The Rustic Olive"
                onSaveRestaurantName={(name) => {
                  setCurrentLocation(`${name} - Main St.`);
                }}
                audioAlertsOn={audioAlertsOn}
                onToggleAudioAlerts={() => setAudioAlertsOn(!audioAlertsOn)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Guest Mobile Ordering Simulator Modal */}
      <GuestMobilePreviewModal
        isOpen={isGuestSimulatorOpen}
        onClose={() => setIsGuestSimulatorOpen(false)}
        table={selectedTable}
        menuItems={menuItems}
        onPlaceOrder={handleGuestPlaceOrder}
        onCallWaiter={handleGuestCallWaiter}
      />
    </div>
  );
}
