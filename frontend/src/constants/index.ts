export const ROUTES = {
  home: '/',
  shop: '/shop',
  product: (slug: string) => `/shop/${slug}`,
  story: '/story',
  donate: '/donate',
  contact: '/contact',
} as const

export const NAV_LINKS = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.shop, label: 'Shop' },
  { to: ROUTES.story, label: 'Our Story' },
  { to: ROUTES.donate, label: 'Donate' },
  { to: ROUTES.contact, label: 'Contact' },
] as const

export const CONTACT = {
  phone: '+91 9526597260',
  phoneHref: 'tel:+919526597260',
  email: 'prastharaventures@gmail.com',
  emailHref: 'mailto:prastharaventures@gmail.com',
  location: 'Kasaragodu, Kerala',
  instagram: 'https://www.instagram.com/PRASTHARA_/',
  instagramHandle: '@PRASTHARA_',
  instagramLabel: 'Instagram',
} as const

export const MESSAGES = {
  brandTagline: 'Giving textiles a second life',
  brandSupport:
    'Through textile thrifting and upcycling, we extend the life of what already exists.',
  cartEmpty: 'Your cart is empty. Discover a piece with a story.',
  checkoutSoon: 'Checkout coming soon',
  addedToCart: 'Added to cart',
  contactSent: 'Thank you — we will get back to you soon.',
  formError: 'Please fill in all fields.',
} as const

export const CART_STORAGE_KEY = 'prasthara-cart'
