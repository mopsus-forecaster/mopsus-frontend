import React, { useContext } from 'react';
import { MFAContainerProps, MfaFlow } from '../../types';
import { MFAAuthenticator } from './components';
import { AuthContext } from '../../contexts';

export const MFAContainer: React.FC<MFAContainerProps> = () => {
  const { currentMfaFlow: code } = useContext(AuthContext);
  const componentMap = {
    [MfaFlow.BlockedAccountRecovery]: MFAAuthenticator,
    [MfaFlow.RegisterPage]: MFAAuthenticator,
  };
  console.log(code);
  const ComponentToRender =
    componentMap[code] || (() => <div>Invalid MFA flow</div>);

  return (
    <div>
      <ComponentToRender />
    </div>
  );
};
