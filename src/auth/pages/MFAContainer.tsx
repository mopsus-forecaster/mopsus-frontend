import React from 'react';
import { MFAContainerProps, MfaFlow } from '../../types';
import { AccountRecovery, BlockedAccountRecovery } from './components';

export const MFAContainer: React.FC<MFAContainerProps> = ({ code }) => {
  const componentMap = {
    [MfaFlow.AccountRecovery]: AccountRecovery,
    [MfaFlow.BlockedAccountRecovery]: BlockedAccountRecovery,
  };

  const ComponentToRender =
    componentMap[code] || (() => <div>Invalid MFA flow</div>);

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};
