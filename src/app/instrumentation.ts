export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { inject } = await import('@vercel/analytics');
    inject();
  }
} 