#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

void foreach(TYPE x)

int main() {
	vector<int> nums;
	nums.clear();
	nums.push_back(5);
	nums.push_back(6);
	
	cout<< "Hello World\n";
	
	for (int i=0;i<nums.size();i++) {
		cout<< "Hello #" << i << '\n';
	}
	
	
	return 0;
}
