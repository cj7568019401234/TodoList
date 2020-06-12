import React from 'react';

export default class Dialog extends React.Component{
    onMaskClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // android trigger click on open (fastclick??)
        if (Date.now() - this.openTime < 300) {
            return;
        }
        if (e.target === e.currentTarget && !this.dialogMouseDown) {
            this.close(e);
        }
    }
    
}