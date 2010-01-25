
def get_template(previous, image, next1)
	template=<<-TEXT
	<html>
		<body>
			<p align="left"><a href="#{previous}.htm">Previous</a> <a href="#{next1}.htm">Next</a></p>
			<img src="#{image}.jpg"/>
		</body>
	</html>
	TEXT
	template
end

def create_file(name, previous, image, next1)
	File.open("#{name}.htm", 'w') {|file| 
		file.puts( get_template(previous, image, next1) )
	} 
end

names = ['02-03',  '04-05',  '06-07',  '08-09',  '10-11',  '12-13',  '14-15',  '16-17',  '18-19',  '20-21',  
'22-23',  '24-25',  '26-27',  '28-29',  '30-31',  '32-33',  '34-35',  '36-37',  '38-39',  '40-41',  '42-43',  
'44-45',  '46-47',  '48-49',  '50-51',  '52-53',  '54-55',  '56-57',  '58-59',  '60-61',  '62-63',  '64-65', 
'66-67',  '68-69',  '70-71',  '72-73',  '74-75',  '76-77',  '78-79',  '80-81', '82-83',  '84-85',  '86-87',  
'88-89',  '90-91',  '92-93', '94-95', '96-97']

names.each_with_index {|name, index| 
	create_file( name, names[index-1], name, names[index+1] )
}

create_file('index', '98-cover',  '00-cover', '01')
create_file('01', 'index',  '01', '02-03')
create_file('02-03', '01',  '02-03', '04-05')
create_file('96-97', '94-95',  '96-97', '98-cover')
create_file('98-cover', '96-97',  '98-cover', 'index')