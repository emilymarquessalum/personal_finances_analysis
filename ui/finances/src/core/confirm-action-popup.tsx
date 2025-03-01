import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from 'react';


interface ConfirmActionPopupProps {
    open: boolean;
    title: string; 
    onConfirm: () => void;
    onCancel: () => void;
    additionalActions?: React.ReactNode;
}

export default function ConfirmActionPopup(
    {
        open,
        title, 
        onConfirm,
        onCancel,
        additionalActions
    } : ConfirmActionPopupProps
) : React.JSX.Element {
    return (
        <Dialog
        open={open}
        onClose={() => { onCancel(); }}
      >
        <DialogTitle>Confirmar</DialogTitle>
        <DialogContent>
          {title}
          {additionalActions}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { onCancel(); }}>Cancelar</Button>
          <Button onClick={onConfirm} color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    );
}