@echo off

set filename=vectors

cd c:\Users\Dennis\Github\ICS4U1\C++\Practise

g++ -c %filename%.cpp
g++ -o %filename% %filename%.o
%filename%.exe

PAUSE