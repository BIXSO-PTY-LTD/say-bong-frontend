import { useState } from 'react';
import { useBoolean } from './use-boolean';

export const useDialogControls = () => {
  const dialogLoginOpen = useBoolean();

  const dialogChangePasswordOpen = useBoolean();

  const dialogRegisterOpen = useBoolean();

  return {
    dialogLoginOpen,
    dialogChangePasswordOpen,
    dialogRegisterOpen,
  };
};