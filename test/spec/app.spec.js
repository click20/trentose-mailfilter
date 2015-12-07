describe("MailModel", function() {
 
    it("should correctly give the element of array filtered", function(){
        MailModel.init();
        var pos= MailModel.filter();
        expect( pos[0] ).toBe(undefined);
        expect( pos[1] ).toBe("carlo@gmail.com");
        expect( pos[2] ).toBe(undefined);
        expect( pos[3] ).toBe("trentose2@googlegroups.com");
    });
    
    it("should correctly give the filtered list of mails", function(){
        var arr= ["carlo@gmail.com","trentose2@googlegroups.com"];
        MailModel.init();
        MailModel.filter();
        expect( MailModel.filterArrayCorrect() ).toEqual(arr);
    });
 
});
