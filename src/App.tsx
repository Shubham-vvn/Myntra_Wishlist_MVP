import React from 'react';
import { useAppStore } from './store/appStore';
import { MyntraShell } from './components/shell/MyntraShell';
import { HomePage } from './components/pages/HomePage';
import { WishlistPage } from './components/pages/WishlistPage';
import { BagPage } from './components/pages/BagPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { ProductDetailModal } from './components/pdp/ProductDetailModal';
import { WishlistToast } from './components/concern/WishlistToast';
import { ConcernInitialPopup } from './components/concern/ConcernInitialPopup';
import { ConcernCategorySelector } from './components/concern/ConcernCategorySelector';
import { ConcernSubFlowModal } from './components/concern/ConcernSubFlowModal';
import { ConcernConfirmationModal } from './components/concern/ConcernConfirmationModal';
import { LockscreenPushBanner } from './components/notifications/LockscreenPushBanner';
import { AssuranceModal } from './components/confidence/AssuranceModal';
import { NotificationCenterModal } from './components/notifications/NotificationCenterModal';

export const App: React.FC = () => {
  const store = useAppStore();

  const renderActiveTab = () => {
    switch (store.activeTab) {
      case 'home':
        return <HomePage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'bag':
        return <BagPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <MyntraShell
      overlays={
        <>
          {/* Screen 1: PDP Modal */}
          <ProductDetailModal />

          {/* Screen 2: Wishlist Confirmation Toast */}
          <WishlistToast />

          {/* Screen 3: Initial Bell Prompt Modal */}
          <ConcernInitialPopup />

          {/* Screen 4: 8-Concern Category Selector */}
          <ConcernCategorySelector />

          {/* Screen 5: Dynamic Follow-Up Sub-Flows */}
          <ConcernSubFlowModal />

          {/* Screen 6: Confirmation Screen */}
          <ConcernConfirmationModal />

          {/* Screen 7: Realistic Lockscreen Push Banner */}
          <LockscreenPushBanner />

          {/* Layer B: Pre-Purchase Confidence Bridge Modal */}
          <AssuranceModal />

          {/* Notification Center Modal */}
          <NotificationCenterModal />
        </>
      }
    >
      {/* Active Tab Page */}
      {renderActiveTab()}
    </MyntraShell>
  );
};

export default App;
