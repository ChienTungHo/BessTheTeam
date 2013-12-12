import xlrd
import json
import shutil
import os

workbook = xlrd.open_workbook('sparkly-menu.xlsx')
worksheet = workbook.sheet_by_name('Sheet1')

num_rows = worksheet.nrows - 1
num_cells = worksheet.ncols - 1
curr_row = 0

product = {}

# Fetch all row from xls file
while curr_row < num_rows:
	curr_row += 1
	row = worksheet.row(curr_row)

	group = worksheet.cell_value(curr_row, 3)

	# Figure out the type of the row
	if group == 'H':
		group = 'horse'
	elif group == 'D':
		group = 'dog'
	else:
		print group

	# Extract the file name as the sell_id
	item_id = worksheet.cell_value(curr_row, 1)

	# Extract the real file name
	sell_id = worksheet.cell_value(curr_row, 2)

	# Extract the sub group from the product list
	sub_group = worksheet.cell_value(curr_row, 4)

	# Package the product information as an obj
	obj = {	'sell_id' : sell_id,
			'item_id' : item_id}

	# Insert the information to the final output json
	if group not in product:
		product[group] = {}

	if sub_group not in product[group]:
		product[group][sub_group] = []

	product[group][sub_group].append(obj)

	""" 
	Two step2 to copy file
	1. Check the folder is exist or not
	2. Copy file from source folder to destination foler
	"""
	f_name = item_id + '.jpg'
	src = 'jpg/'
	des = 'product/' + group + '/'
	
	if not os.path.exists(des):
		os.mkdir(des)

	if os.path.exists(src + f_name):
		shutil.copyfile(src + f_name , des + f_name)
	else:
		product[group][sub_group].remove(obj)
		print src + f_name

for group in product:
	content = []
	for sub_group in product[group]:
		content.append(product[group][sub_group])

	with open(group + '.json', 'w') as output:
		json.dump(content, output)

	#curr_cell = -1
	
	#while curr_cell < num_cells:
		#curr_cell += 1
		# Cell Types: 0=Empty, 1=Text, 2=Number, 3=Date, 4=Boolean, 5=Error, 6=Blank
		#cell_type = worksheet.cell_type(curr_row, curr_cell)
		#cell_value = worksheet.cell_value(curr_row, curr_cell)
		#print '	', cell_type, ':', cell_value


