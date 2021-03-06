import { Component, Input } from '@angular/core';

import { SidebarComponent as BaseSidebarComponent } from 'theme/components/sidebar';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['../../../theme/components/sidebar/sidebar.component.scss', './sidebar.component.scss'],
  templateUrl: '../../../theme/components/sidebar/sidebar.component.html',
})
export class SidebarComponent extends BaseSidebarComponent {
  public title = 'darkboard';
  public menu = [
    { name: 'Classic Dashboard', link: '/app/dashboard', icon: 'dashboard' },
    { name: 'Custom Dashboard', link: '/app/dashboard-custom', icon: 'view_quilt' },
    {
      name: 'UI',
      children: [
        ...[
          'buttons',
          'cards',
          'colors',
          'forms',
          'icons',
          'typography',
          'tables',
        ].map(ui => ({
          name: ui[0].toUpperCase() + ui.slice(1),
          link: `/ui/${ui}`,
        })),
        {
          name: 'Right sidebar',
          link: '/ui/right-sidebar',
        },
      ],
      icon: 'view_comfy',
    },
    { name: 'Components', link: '/app/components', icon: 'developer_board' },
    { name: 'Account', link: '/app/profile', icon: 'person' },
    { name: 'Register Employees', link: '/app/register-employee', icon: 'person' },
    { name: 'List Employees', link: '/app/list-admins', icon: 'person' },
    { name: 'List Users', link: '/app/list-users', icon: 'person' },
    { name: 'List subscriptions', link: '/app/subscriptions', icon: 'view_comfy' },
    { name: 'List transactions', link: '/app/transactions', icon: 'view_comfy' },
    { name: 'refund requests', link: '/app/refund-requests', icon: 'view_comfy' },
    { name: 'customers questions', link: '/app/customers-questions', icon: 'person' },
    { name: 'statistics', link: '/app/statistics', icon: 'multiline_chart' },
    { name: 'userActivitys', link: '/app/user-activitys', icon: 'person' },
    
    { name: 'ADD NEW PRODUCT', link: '/app/add-product', icon: 'add' },
    { name: 'PRODUCTS LIST', link: '/app/products-list', icon: 'list' },

    {
      name: 'Maps', icon: 'map', children: [
      { name: 'Simple map', link: '/maps/simple' },
      { name: 'Advanced map', link: '/maps/advanced' },
      ],
    },
    { name: 'Charts', link: '/app/charts', icon: 'multiline_chart' },
    {
      name: 'Pages', children: [
      { name: 'Sign in', link: '/pages/login' },
      { name: 'Sign up', link: '/pages/sign-up' },
      { name: 'Forgot password', link: '/pages/forgot-password' },
      { name: '404', link: '/pages/error' },
      ],
      icon: 'pages',
    },
  ];
}
