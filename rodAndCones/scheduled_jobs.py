""" this is a script that contains the locations of other scripts that lives under this project to run in a periodic manner """
""" the execution is handled by the server"""

import imp
import os

def main():
	CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
	tasks_data = [
		os.path.join(CURRENT_DIR, "blog/blog/scheduled_jobs.py")
	]

	for i in enumerate(tasks_data):
		index = i[0]
		task_path = i[1]
		task = imp.load_source('module_' + str(i[0]), task_path)
		task.main()

if __name__ == '__main__':
	main()