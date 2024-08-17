import { createCampaign, dashboard, logout, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/analytics',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: false,
  },
];