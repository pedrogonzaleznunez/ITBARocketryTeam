# Image Sequence for Canvas Animation

This directory should contain numbered frames for the canvas scroll animation.

## Setup Instructions

1. **Create Image Sequence**
   - Export 30-60 frames from your video or 3D animation
   - Name them sequentially: `frame_0001.jpg`, `frame_0002.jpg`, etc.
   - Recommended format: JPG (optimized)
   - Recommended dimensions: 1600-2000px width
   - Keep file sizes reasonable (50-200KB per frame)

2. **Naming Convention**
   ```
   frame_0001.jpg
   frame_0002.jpg
   frame_0003.jpg
   ...
   frame_0030.jpg
   ```

3. **Fallback Behavior**
   - If no images are present, a gradient placeholder will display
   - The animation will still work, showing "Add images to /public/sequence/"

## Tips for Best Results

- **Frame Count**: 30-60 frames works well for most use cases
- **Optimization**: Use tools like ImageOptim or Squoosh to compress images
- **Aspect Ratio**: Square (1:1) or 4:3 works best with the default layout
- **Quality**: Medium-high quality JPG (80-85%) is optimal
- **Consistency**: All frames should have identical dimensions

## Example Workflow

### Using After Effects
1. Render your composition as an image sequence
2. Format: JPEG, Quality: 85%
3. Rename files to match the pattern above

### Using Blender
1. Output Properties > File Format: JPEG
2. Set frame range (e.g., 1-30)
3. Render > Render Animation
4. Rename files to match the pattern

### Using Video Files
1. Use FFmpeg to extract frames:
   ```bash
   ffmpeg -i input.mp4 -vf fps=2 frame_%04d.jpg
   ```
2. Rename to match pattern if needed

## Current Status

⚠️ **No frames detected**
Add your frame files to this directory to enable the canvas scroll animation.

