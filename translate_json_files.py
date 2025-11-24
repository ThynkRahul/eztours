#!/usr/bin/env python3
"""
Script to translate JSON files from English to Spanish, German, and French using DeepL API.
Keeps all keys intact and only translates string values.
"""

import json
import os
import requests
from typing import Dict, Any, List
import time

# DeepL API configuration
DEEPL_API_KEY = "DEEPL_API_KEY"  # Replace with your actual DeepL API key
DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"

# Language codes for DeepL
LANGUAGES = {
    "es": "ES",  # Spanish
    # "de": "DE",  # German
    # "fr": "FR"   # French
}

def translate_text(text: str, target_lang: str) -> str:
    """
    Translate text using DeepL API
    """
    if not text.strip():
        return text
    
    headers = {
        "Authorization": f"DeepL-Auth-Key {DEEPL_API_KEY}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    data = {
        "text": text,
        "source_lang": "EN",
        "target_lang": target_lang
    }
    delay = 1
    retry = 0

    while retry < 5:
        try:
            response = requests.post(DEEPL_API_URL, headers=headers, data=data)
            response.raise_for_status()
        
            result = response.json()
            if result.get("translations"):
                return result["translations"][0]["text"]
            else:
                print(f"Warning: No translation returned for text: {text[:50]}...")
                return text
        except requests.exceptions.RequestException as e:
            print(f"Error translating text: {e}")
            print(f"Retrying {retry} times, text: {text[:50]}...")
            retry += 1
            time.sleep(delay * retry)
            delay *= 2
        except Exception as e:
            print(f"Unexpected error: {e}")
            retry += 1
            time.sleep(delay * retry)
            delay *= 2

    raise Exception(f"Failed to translate text: {text}")

def extract_strings(obj: Any) -> List[str]:
    """
    Recursively extract all string values from a JSON object
    """
    strings = []
    
    if isinstance(obj, dict):
        for value in obj.values():
            strings.extend(extract_strings(value))
    elif isinstance(obj, list):
        for item in obj:
            strings.extend(extract_strings(item))
    elif isinstance(obj, str):
        strings.append(obj)
    
    return strings

def replace_strings(obj: Any, translations: Dict[str, str]) -> Any:
    """
    Recursively replace string values in a JSON object with their translations
    """
    if isinstance(obj, dict):
        return {key: replace_strings(value, translations) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [replace_strings(item, translations) for item in obj]
    elif isinstance(obj, str):
        return translations.get(obj, obj)
    else:
        return obj

def translate_json_file(input_file: str, output_file: str, target_lang: str):
    """
    Translate a JSON file to the target language
    """
    print(f"Translating {input_file} to {target_lang}...")
    
    # Read the input JSON file
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Extract all strings
    strings = extract_strings(data)
    unique_strings = list(set(strings))
    
    print(f"Found {len(unique_strings)} unique strings to translate")
    
    # Create translation mapping
    translations = {}
    
    # Translate strings in batches to avoid rate limiting
    batch_size = 50
    for i in range(0, len(unique_strings), batch_size):
        batch = unique_strings[i:i + batch_size]
        print(f"Translating batch {i//batch_size + 1}/{(len(unique_strings) + batch_size - 1)//batch_size}")
        time.sleep(20)
        for text in batch:
            if text.strip():  # Only translate non-empty strings
                translated = translate_text(text, target_lang)
                translations[text] = translated
                time.sleep(0.2)  # Small delay to avoid rate limiting
    
    # Replace strings in the JSON structure
    translated_data = replace_strings(data, translations)
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    # Write the translated JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)
    
    print(f"Translated file saved to {output_file}")

def main():
    """
    Main function to translate all JSON files
    """
    # Check if DeepL API key is set
    if DEEPL_API_KEY == "YOUR_DEEPL_API_KEY":
        print("Error: Please set your DeepL API key in the script")
        print("You can get a free API key from: https://www.deepl.com/pro-api")
        return
    
    # Source directory
    en_dir = "data/en"
    
    # Check if source directory exists
    if not os.path.exists(en_dir):
        print(f"Error: Source directory {en_dir} does not exist")
        return
    
    # Get all JSON files from the English directory
    json_files = ['delta.json']
    
    if not json_files:
        print(f"No JSON files found in {en_dir}")
        return
    
    print(f"Found {len(json_files)} JSON files to translate")
    
    # Translate each file to each language
    for filename in json_files:
        input_path = os.path.join(en_dir, filename)
        
        for lang_code, deepl_lang in LANGUAGES.items():
            output_dir = f"data/{lang_code}"
            output_path = os.path.join(output_dir, filename)
            
            print(f"\n{'='*50}")
            print(f"Processing: {filename} -> {lang_code}")
            print(f"{'='*50}")
            
            translate_json_file(input_path, output_path, deepl_lang)
            
            # Add a small delay between files to be respectful to the API
            time.sleep(1)
    
    print(f"\n{'='*50}")
    print("Translation completed!")
    print(f"{'='*50}")

if __name__ == "__main__":
    main() 