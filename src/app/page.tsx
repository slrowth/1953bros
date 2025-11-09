   'use client';

   import { useState } from 'react';

   export default function AnnouncementsPage() {
     const [userRole] = useState<'HQ' | 'Store'>('HQ');
     const storeId = userRole === 'Store' ? 'store-dummy-id' : undefined;

     return (
       <AnnouncementList storeId={storeId} />
       // ...
     );
   }
