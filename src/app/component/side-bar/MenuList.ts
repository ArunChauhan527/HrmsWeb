export class MenuItem {
    constructor(
        public sno: number =0,
        public name: string,
        public route: string,
        public toolTip: string,
        public icon: string = ''
    ) {}
}

export const menuList = [
    new MenuItem(0,'DashBoard', 'home', 'DashBoard', 'home'),
    new MenuItem(0,'Profile', 'profile', 'Profile', 'face'),
    new MenuItem(0,'Leave', 'leave', 'Leave', 'schedule'),
    new MenuItem(0,'Attandance', 'attandance', 'Attandnace', 'today'),
    new MenuItem(0,'Payroll', 'payroll', 'PayRoll', 'calculate'),
    new MenuItem(0,'Register', 'register', 'Register Employes', 'accessibility'),
    new MenuItem(0,'Reimbursement', 'reimbursement', 'Reimbursement', 'payment'),
    new MenuItem(0,'Settings', 'settings', 'Settings', 'settings'),
    new MenuItem(0,'Client', 'client', 'Client Config', 'settings')

];