export class MenuItem {
    constructor(
        public name: string,
        public route: string,
        public toolTip: string,
        public icon: string = ''
    ) {}
}

export const menuList = [
    new MenuItem('DashBoard', 'home', 'DashBoard', 'home'),
    new MenuItem('Profile', 'profile', 'Profile', 'face'),
    new MenuItem('Leave', 'leave', 'Leave', 'schedule'),
    new MenuItem('Attandance', 'attandance', 'Attandnace', 'today'),
    new MenuItem('Payroll', 'payroll', 'PayRoll', 'calculate'),
    new MenuItem('Register', 'register', 'Register Employes', 'accessibility'),
    new MenuItem('Reimbursement', 'reimbursement', 'Reimbursement', 'payment'),
    new MenuItem('Settings', 'settings', 'Settings', 'settings')

];