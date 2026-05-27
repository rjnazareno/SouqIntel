# Manual Image Curation Guide

## Step-by-Step Process

### 1. Add Image URLs to `perfume-image-urls.json`

Open `server/perfume-image-urls.json` and paste image URLs for each perfume:

```json
{
  "Baccarat Rouge 540": "https://example.com/baccarat-rouge-540.jpg",
  "Aventus": "https://example.com/aventus.jpg",
  "Oud Wood": "",
  ...
}
```

**Where to find image URLs:**

#### Official Brand Websites:
- **Tom Ford**: tomford.com
- **Maison Francis Kurkdjian**: maisonfranciskurkdjian.com
- **Creed**: creedfragrances.com
- **Lattafa**: lattafaperfumes.com
- **Armaf**: armaf.com

#### Retailer Websites:
- FragranceX.com
- FragranceNet.com
- Notino.com
- Sephora.com

**How to get the image URL:**
1. Right-click on the perfume bottle image
2. Select "Copy image address" or "Copy image URL"
3. Paste it into the JSON file

**Note:** You don't need to add all 83 at once! Start with the popular ones:
- Top 10-15 designer/niche perfumes
- Top 10-15 Arabian dupes
- Add more over time

---

### 2. Download the Images

Once you've added URLs, run:

```bash
cd server
node download-curated-images.js
```

This will:
- Download all images with URLs
- Save them to `client/public/images/perfumes/`
- Create `image-mapping.json` with the paths
- Show a summary of what was downloaded

---

### 3. Update Seed Data

```bash
node update-seed-with-images.js
```

This automatically updates `seed.js` with the local image paths.

---

### 4. Re-seed Database

```bash
npm run seed
```

Done! Refresh your browser to see the new images.

---

## Tips

**Start Small:**
Add just 10-20 popular perfumes first to see if you like the process.

**Image Quality:**
- Use images at least 800x800 pixels
- Square or vertical formats work best
- Clear bottle shots on white/neutral backgrounds

**Gradual Process:**
You can add URLs in batches:
1. Add 10 URLs → run download script → test
2. Add 10 more → run download script → test
3. Continue until satisfied

**Backup:**
The original emoji placeholders will remain for any perfume without an image.

---

## Example: Adding First 5 Perfumes

```json
{
  "Baccarat Rouge 540": "https://www.maisonfranciskurkdjian.com/media/catalog/product/b/r/br540_edp_70ml_web.jpg",
  "Aventus": "https://www.creedfragrances.com/media/catalog/product/a/v/aventus_100ml.jpg",
  "Oud Wood": "https://www.tomford.com/media/catalog/product/o/u/oud_wood_edp.jpg",
  "Sauvage": "https://www.dior.com/media/catalog/product/s/a/sauvage_edp.jpg",
  "Club de Nuit Intense Man": "https://www.armaf.com/media/catalog/product/c/d/cdnim.jpg"
}
```

Then run:
```bash
node download-curated-images.js
node update-seed-with-images.js
npm run seed
```

---

Need help finding specific perfume images? Let me know which ones!
