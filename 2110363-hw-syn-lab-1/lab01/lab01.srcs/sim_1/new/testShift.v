`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 08/20/2024 02:06:46 PM
// Design Name: 
// Module Name: testShift
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


module testShift(

    );
    wire[1:0] q1, q2;
    reg clock, d;
    shiftA s1(q1,clock,d);
    shiftB s2(q2,clock,d);
    always
        #10 clock=~clock;
    initial begin
        #0
        clock=0;
        d=0;
 
        
        #100 $finish;
    end
    always
        #8 d=~d;
endmodule
