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
    new MenuItem('Leave', 'leave', 'Leave', 'schedule'),
    new MenuItem('Attandance', 'attandance', 'Attandnace', 'today'),
    new MenuItem('Payroll', 'payroll', 'PayRoll', 'calculate'),
    new MenuItem('Register', 'register', 'Register Employes', 'calculate')
];