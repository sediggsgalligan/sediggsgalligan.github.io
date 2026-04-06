import os
import xml.etree.ElementTree as ET

# Configuration
TARGET_DIRECTORY = '.'
TEXTURE_URL = '/assets/images/shapes/cardboard_texture.jpg'

def optimize_all_svg_textures(directory):
    # Register namespaces to keep the XML clean
    ET.register_namespace('', "http://www.w3.org/2000/svg")
    ET.register_namespace('xlink', "http://www.w3.org/1999/xlink")

    # Define the namespace map for searching
    ns = {
        'svg': 'http://www.w3.org/2000/svg',
        'xlink': 'http://www.w3.org/1999/xlink'
    }

    for filename in os.listdir(directory):
        if filename.endswith(".svg"):
            file_path = os.path.join(directory, filename)
            
            try:
                tree = ET.parse(file_path)
                root = tree.getroot()
                modified = False

                # Search for all <image> tags
                for img in root.iter('{http://www.w3.org/2000/svg}image'):
                    # Check for href in both standard and xlink namespaces
                    href_key = None
                    if '{http://www.w3.org/1999/xlink}href' in img.attrib:
                        href_key = '{http://www.w3.org/1999/xlink}href'
                    elif 'href' in img.attrib:
                        href_key = 'href'

                    if href_key:
                        current_href = img.get(href_key)
                        
                        # Logic: If it's a Base64 string, replace it
                        if current_href.startswith('data:image'):
                            img.set('{http://www.w3.org/1999/xlink}href', TEXTURE_URL)
                            
                            # Clean up standard href to ensure xlink takes precedence
                            if 'href' in img.attrib and href_key != 'href':
                                del img.attrib['href']
                                
                            print(f"✅ Cleaned Base64 from {filename} (ID: {img.get('id')})")
                            modified = True

                if modified:
                    # Use method='xml' to ensure tags like <image /> stay valid
                    tree.write(file_path, encoding='utf-8', xml_declaration=True)

            except Exception as e:
                print(f"❌ Error processing {filename}: {e}")

if __name__ == "__main__":
    if not os.path.exists(TARGET_DIRECTORY):
        print(f"Directory '{TARGET_DIRECTORY}' not found.")
    else:
        optimize_all_svg_textures(TARGET_DIRECTORY)
        print("\nDone! All SVGs now reference the external JPG.")