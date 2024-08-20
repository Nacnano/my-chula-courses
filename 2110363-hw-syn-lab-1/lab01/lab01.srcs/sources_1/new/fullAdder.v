`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 08/20/2024 01:45:17 PM
// Design Name: 
// Module Name: fullAdder
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module fullAdder(
    output cout,
    output s,
    input cin,
    input a,
    input b
    );
    

//reg cout, s;
//always @(a or b or cin) // always only for reg

//begin
//    {cout, s} = a+b+cin;
//end

// if no declare => wire (auto)
    assign {cout,s} = a + b + cin; // assign only for wire

endmodule
