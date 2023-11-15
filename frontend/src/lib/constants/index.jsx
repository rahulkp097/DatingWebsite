import {
	HiOutlineViewGrid,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
} from 'react-icons/hi';
import { PiBeerSteinBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";


export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'userlist',
		label: 'Userlist',
		path: '/admin/users',
		icon: <FaUsers />
	},
	{
		key: 'orders',
		label: 'subscriptions',
		path: '/admin/subscriptions',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'transactions',
		label: 'Reports',
		path: '/admin/token',
		icon: <HiOutlineDocumentText />
	},
	// {
	// 	key: 'halls',
	// 	label: 'Halls',
	// 	path: '/halls',
	// 	icon: <HiOutlineUsers />
	// },
	// {
	// 	key: 'caterings',
	// 	label: 'Caterings',
	// 	path: '/caterings',
	// 	icon: <PiBeerSteinBold />
	// }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	// {
	// 	key: 'settings',
	// 	label: 'Settings',
	// 	path: '/settings',
	// 	icon: <HiOutlineCog />
	// },
	// {
	// 	key: 'support',
	// 	label: 'Help & Support',
	// 	path: '/support',
	// 	icon: <HiOutlineQuestionMarkCircle />
	// }
]