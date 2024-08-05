import os

def directory_exists_and_has_files(directory):
    # Check if directory exists
    if os.path.isdir(directory):
        # Check if directory contains any files
        if os.listdir(directory):
            return True
    return False

# # Usage
# directory = "/path/to/your/directory"
# if directory_exists_and_has_files(directory):
#     print("Directory exists and has files")
# else:
#     print("Directory does not exist or is empty")