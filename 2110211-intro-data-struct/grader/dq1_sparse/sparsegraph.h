#ifndef __SPARSE_GRAPH_H__
#define __SPARSE_GRAPH_H__

// Your code here
#include<vector>
#include<set>

using namespace std;

class SparseGraph{
public:
    SparseGraph() {
        // Your code here
        node = 3;
        edge = vector<set<int>> (3);
    }

    SparseGraph(int n_in) {
        // Your code here
        node = n_in;
        edge = vector<set<int>> (n_in);
    }

    SparseGraph(const SparseGraph& G) {
        // Your code here
        node = G.node;
        edge = G.edge;

    }

    void AddEdge(int a, int b) {
        // Your code here
        edge[a].insert(b);
    }

    void RemoveEdge(int a, int b) {
        // Your code here
        edge[a].erase(b);
    }

    bool DoesEdgeExist(int a, int b) const {
        // Your code here
        return edge[a].find(b) != edge[a].end();
    }

    SparseGraph Transpose() const {
        // Your code here
        SparseGraph ret(node);
        for(int u = 0;u < edge.size(); u++){
            for(auto v: edge[u]){
                ret.AddEdge(v, u);
            }
        }
        return ret;
    }

protected:
    // Your code here
    int node;
    vector<set<int> > edge;
};
#endif // __SPARSE_GRAPH_H__

