import string
import random

characters = list(string.ascii_letters + string.digits + "!@#$%^&*()-_")

char_arr = []

for i in range(50):
    char_arr.append(random.choice(characters))

print (''.join(char_arr))
#BzrW%VdDAIvAY#gOj^sD*tXpSFtHgHZ6iq#k!^8MQv$!IMX7y3
#269N$bIV^p@UwWhIqv%9SxYG6MHviFES-Iee9*BERGOfQwi2DA
