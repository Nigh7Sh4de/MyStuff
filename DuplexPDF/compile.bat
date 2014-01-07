@echo off
cd c:\Users\Dennis\Github\MyStuff\DuplexPDF

echo Compiling...
g++ -c main.cpp

g++ -o DuplexPDF main.o
echo Finished.
echo Result:
echo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

DuplexPDF

PAUSE