import React from 'react';

// 👑 Aurelia OS का शुद्ध पैरेंट लेआउट, बिना किसी डुप्लिकेट कॉन्फ़िगरेशन टकराव के
export default function HomeFolderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
