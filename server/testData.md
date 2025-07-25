
# login validation 

# one

{

}

# two

{
    "email" : "main1@admin.com",
}

# three

{
    "password" : "123456"
}

# four

invalid

{
   "email" : "main1@admin.com",
   "password" : "123457" 
}



# five

valid

{
   "email" : "main1@admin.com",
   "password" : "123456" 
}


xx :

{
   "email" : "studentcse1@college.com",
   "password" : "123456" 
}


yy :

{
   "email" : "staffcse1@college.com",
   "password" : "123456" 
}




## logout 

## check Auth

=> through cookies




# for add person


# one

{

}

# two

{
    "name": "Anjali Kumari",
}

# three

{

    "name": "Anjali Kumari",
    "email": "faculty_cse@college.com",

}

# four

{
    "email": "faculty_cse@college.com",

}


# five
 in valid role id

{
  "name": "Anjali Kumari",
  "email": "faculty_cse@college.com",
  "role": "64f7b5fc6a19e9c3e6a3b11b",
}

# six

 valid role id

{
  "name": "Anjali Kumari",
  "email": "faculty_cse@college.com",
  "role": "64f7b5fc6a19e9c3e6a3b11b",
}

# seveen

 valid role id with invalid dept id

{
  "name": "Anjali Kumari",
  "email": "faculty_cse@college.com",
  "role": "64f7b5fc6a19e9c3e6a3b11b",
}


# eight

valid role id with valid dept


{
  "name": "Anjali Kumari",
  "email": "faculty_cse@college.com",
  "role": "6883345fc232610ff247df58",
  "department" : "6883345fc232610ff247df62"
}


: xx

{
  "name": "Anjali Kumari",
  "email": "stud_cse@college.com",
  "role": "6883345fc232610ff247df59",
  "department" : "6883345fc232610ff247df62"
}





### add college


{
  "code": "ABC123",
  "name": "Sunrise Institute of Technology",
  "description": "A premier engineering college in India.",
  "address": "NH-5, Vizag Highway, AP",
  "contactEmail": "contact@sunrise.edu.in",
  "contactPhone": "+918888888888"
}



### add dept


{
  "name": "Electrical Engineering",
  "code": "EEE",
  "description": "Department of Electrical Engineering",
  "collegeId": "6883345fc232610ff247df53"  
}



### add role


{
  "name": "chairmen",
  "description": "Handles academic sessions",
  "hasDepartment": true,
  "collegeId": "6883345fc232610ff247df53",  
  "canAdd": ["6883345fc232610ff247df59"],  
  "canDelete": [],
  "canView": []
}






















