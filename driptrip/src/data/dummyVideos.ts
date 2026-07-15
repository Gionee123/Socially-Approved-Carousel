export interface Video {
  id: string
  creator: string
  creatorAvatar: string
  videoUrl: string
  thumbnail: string
  title: string
  price: number
  originalPrice: number
  likes: number
  shares: number
  comments?: number
  discount?: number
  productImage?: string
  description: string
}

const videoUrls = [
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
]

export const dummyVideos: Video[] = [
  { id: 'v1',  creator: 'chs_tarun_bhati',    creatorAvatar: 'https://i.pravatar.cc/50?img=1',  videoUrl: videoUrls[0], thumbnail: 'https://picsum.photos/seed/gym1/300/533',   title: 'High Quality Resistance Bands',    price: 1999, originalPrice: 3999, likes: 124, shares: 45,  description: 'Perfect resistance bands for home gym.' },
  { id: 'v2',  creator: 'DripTrip_Official',  creatorAvatar: 'https://i.pravatar.cc/50?img=2',  videoUrl: videoUrls[1], thumbnail: 'https://picsum.photos/seed/gym2/300/533',   title: 'Premium Water Bottle 2500ML',      price: 2199, originalPrice: 3999, likes: 89,  shares: 23,  description: 'Stay hydrated in style.' },
  { id: 'v3',  creator: 'health_with_priya',  creatorAvatar: 'https://i.pravatar.cc/50?img=3',  videoUrl: videoUrls[2], thumbnail: 'https://picsum.photos/seed/yoga1/300/533',  title: 'Yoga Mat Pro Edition',             price: 999,  originalPrice: 1999, likes: 234, shares: 67,  description: 'Non-slip premium yoga mat.' },
  { id: 'v4',  creator: 'gym_motivation_99',  creatorAvatar: 'https://i.pravatar.cc/50?img=4',  videoUrl: videoUrls[3], thumbnail: 'https://picsum.photos/seed/gym4/300/533',   title: 'Protein Shaker Bottle',            price: 599,  originalPrice: 999,  likes: 156, shares: 34,  description: 'BPA-free leak proof shaker.' },
  { id: 'v5',  creator: 'fitness_daily_dose', creatorAvatar: 'https://i.pravatar.cc/50?img=5',  videoUrl: videoUrls[4], thumbnail: 'https://picsum.photos/seed/jump1/300/533',  title: 'Jump Rope Speed Cable',            price: 449,  originalPrice: 899,  likes: 78,  shares: 12,  description: 'Speed rope for HIIT training.' },
  { id: 'v6',  creator: 'workout_with_sam',   creatorAvatar: 'https://i.pravatar.cc/50?img=6',  videoUrl: videoUrls[5], thumbnail: 'https://picsum.photos/seed/push1/300/533',  title: 'Push Up Board Set',                price: 799,  originalPrice: 1599, likes: 345, shares: 89,  description: 'Multi-grip push up board.' },
  { id: 'v7',  creator: 'nutri_guru_india',   creatorAvatar: 'https://i.pravatar.cc/50?img=7',  videoUrl: videoUrls[6], thumbnail: 'https://picsum.photos/seed/prot1/300/533',  title: 'Whey Protein Chocolate 1kg',       price: 1499, originalPrice: 2499, likes: 567, shares: 123, description: '25g protein per serving.' },
  { id: 'v8',  creator: 'sports_fever_in',    creatorAvatar: 'https://i.pravatar.cc/50?img=8',  videoUrl: videoUrls[7], thumbnail: 'https://picsum.photos/seed/shoe1/300/533',  title: 'Running Shoes Ultra Boost',        price: 2499, originalPrice: 4999, likes: 234, shares: 56,  description: 'Lightweight performance shoes.' },
  { id: 'v9',  creator: 'flex_zone_official', creatorAvatar: 'https://i.pravatar.cc/50?img=9',  videoUrl: videoUrls[0], thumbnail: 'https://picsum.photos/seed/ab1/300/533',    title: 'Ab Roller Wheel Pro',              price: 349,  originalPrice: 699,  likes: 189, shares: 45,  description: 'Strengthen your core fast.' },
  { id: 'v10', creator: 'body_goals_india',   creatorAvatar: 'https://i.pravatar.cc/50?img=10', videoUrl: videoUrls[1], thumbnail: 'https://picsum.photos/seed/glove1/300/533', title: 'Gym Gloves Anti-Slip',             price: 299,  originalPrice: 599,  likes: 123, shares: 28,  description: 'Premium anti-slip gym gloves.' },
  { id: 'v11', creator: 'strong_body_fit',    creatorAvatar: 'https://i.pravatar.cc/50?img=11', videoUrl: videoUrls[2], thumbnail: 'https://picsum.photos/seed/foam1/300/533',  title: 'Foam Roller Massage Tool',         price: 649,  originalPrice: 1299, likes: 456, shares: 91,  description: 'Deep tissue muscle recovery.' },
  { id: 'v12', creator: 'lean_muscle_pro',    creatorAvatar: 'https://i.pravatar.cc/50?img=12', videoUrl: videoUrls[3], thumbnail: 'https://picsum.photos/seed/dumb1/300/533',  title: 'Dumbbell Set 5kg Pair',            price: 999,  originalPrice: 1999, likes: 789, shares: 234, description: 'Cast iron coated dumbbell pair.' },
]
