#include <iostream>
#include <fstream>

using namespace std;

int main() {
	cout<< "Creating ifstream...\n";
	ifstream iFile;
	
	cout<< "Opening file...\n";
	iFile.open("myfile.txt");
	
	cout<< "Reading file...\n";
	string line[3];
	int counter = 0;
	while (iFile.good()) {
		getline(iFile, line[counter]);
		counter ++;
	}
	
	cout<< "Closing file...\n";
	iFile.close();
	
	cout<< "\nResult:\n";
	for (int i=0;i<3;i++) {
		cout<< line[i] <<'\n';
	}
	return 0;
}

class FileReader {
	
	ifstream file;
	
	public:
		FileReader() {
			file.open("myfile.txt");
		}
		
		vector<string> line() {
			string lines[3];
			int counter = 0;
			while (file.good()) {
				getline(file, lines[counter]);
				counter ++;
			}
			return lines;
		}
};